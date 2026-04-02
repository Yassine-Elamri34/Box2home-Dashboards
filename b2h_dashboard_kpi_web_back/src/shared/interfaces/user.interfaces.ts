import { Document } from 'mongoose';

export interface ILogin {
       email: string;
       password: string;
}
export enum Role {
       Admin = 'admin',
       PO = 'PO',
       Dev = 'dev'
}

// Interface for the User document
export interface IUser extends Document {
       username: string;
       email: string;
       password?: string;
       role: Role;
       //assignedProject: string;
}
