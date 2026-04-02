import mongoose, { Schema } from 'mongoose';
import { IUser, Role } from '../interfaces/user.interfaces';

const userSchema: Schema = new Schema({
       username: {
              type: String,
              required: true
       },

       email: {
              type: String,
              required: true,
              unique: true
       },

       password: {
              type: String,
              required: true
       },

       role: {
              type: String,
              enum: Object.values(Role),
              required: true
       }

       /*      assignedProject: {
              type: String
       } */
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
