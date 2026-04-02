import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation

// Import the UserModel
import UserModel from '@src/shared/models/User';
import { ILogin, IUser } from '@src/shared/interfaces/user.interfaces';
import { sendWelcomeEmail } from '@src/shared/helpers/mail.helpers';

// Configuration for JWT strategy
const jwtOptions = {
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       secretOrKey: 'your-secret-key' // Change this to your own secret key
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

// Define user services
const userServices = {
       async createUser({ username, email, password, role }: IUser) {
              try {
                     // Check if email already exists
                     const existingUser = await UserModel.findOne({ email });
                     if (existingUser) {
                            throw 'Email est deja utilisé par un autre utilisateur';
                     }

                     // Hash the password
                     const hashedPassword = await bcrypt.hash(password, 10);

                     // Create a new user
                     const newUser = new UserModel({
                            username,
                            email,
                            password: hashedPassword,
                            role
                     });

                     // Save the user to the database
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
                     // Find user by email
                     var user: IUser | null = await UserModel.findOne({ email });
                     // If user not found, return null
                     if (!user) {
                            throw 'Email est inccorect';
                     }
                     user = user?.toObject();
                     // Compare passwords
                     const isPasswordValid = await bcrypt.compare(password, user.password);

                     // If password is invalid, return null
                     if (!isPasswordValid) {
                            throw 'Mot de passe est inccorect';
                     }

                     delete user.password;
                     // Generate JWT token
                     const token = jwt.sign({ id: user._id }, jwtOptions.secretOrKey, { expiresIn: '1h' }); // Change expiresIn as per your requirement

                     // Return the user and token
                     return { user, token };
              } catch (error) {
                     throw error;
              }
       },
       getAll: async () => {
              try {
                     var users: IUser[] = await UserModel.find({ role: { $ne: 'admin' } }, { password: 0 });
                     return users;
              } catch (error) {
                     throw new Error('Error Fetch all users');
              }
       }
};

// Export user services
export default userServices;
