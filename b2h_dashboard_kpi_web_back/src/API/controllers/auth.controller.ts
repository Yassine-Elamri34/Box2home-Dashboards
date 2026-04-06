import { Request, Response } from 'express';
import userServices from '../services/users.services';
import { ILogin, IUser } from '../../shared/interfaces/user.interfaces';

const loginController = async (req: Request, res: Response) => {
       try {
              const { body }: { body: ILogin } = req;
              const data = await userServices.loginUser(body);
              return res.status(200).json({
                     data,
                     status: 200,
                     message: 'operation done  successfully.'
              });
       } catch (error) {
              return res.status(400).json({
                     error,
                     message: 'Server error...',
                     status: 400
              });
       }
};

const registerController = async (req: Request, res: Response) => {
       try {
              const { body }: { body: IUser } = req;
              console.log(body);
              const newUser = await userServices.createUser(body);

              return res.status(200).json({
                     newUser,
                     status: 200,
                     message: 'user created successfully.'
              });
       } catch (error) {
              return res.status(400).json({
                     error,
                     message: 'Server error...',
                     status: 400
              });
       }
};

const authController = {
       loginController,
       registerController
};

export default authController;
