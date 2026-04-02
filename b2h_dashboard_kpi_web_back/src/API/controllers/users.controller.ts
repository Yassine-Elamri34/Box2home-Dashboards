import { Request, Response } from 'express';
import userServices from '../services/users.services';

const getUsersList = async (_: Request, res: Response) => {
       try {
              const data = await userServices.getAll();
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

const authController = {
       getUsersList
};

export default authController;
