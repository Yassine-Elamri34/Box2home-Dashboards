import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

// FIXED IMPORTS (no @src)
import UserModel from '../../shared/models/User';
import { ILogin, IUser } from '../../shared/interfaces/user.interfaces';
import { sendWelcomeEmail } from '../../shared/helpers/mail.helpers';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key'
};

// Configure Passport JWT strategy
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await UserModel.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// User services
const userServices = {
  async createUser({ username, email, password, role }: IUser) {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw 'Email est deja utilisé par un autre utilisateur';
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        role
      });

      await newUser.save();

      await sendWelcomeEmail({
        username,
        email,
        password
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async loginUser({ email, password }: ILogin) {
    try {
      let user: any = await UserModel.findOne({ email });

      if (!user) {
        throw 'Email est incorrect';
      }

      user = user.toObject();

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw 'Mot de passe est incorrect';
      }

      delete user.password;

      const token = jwt.sign(
        { id: user._id },
        jwtOptions.secretOrKey,
        { expiresIn: '1h' }
      );

      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const users: IUser[] = await UserModel.find(
        { role: { $ne: 'admin' } },
        { password: 0 }
      );
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }
};

export default userServices;