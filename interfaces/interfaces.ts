import mongoose from 'mongoose';

export interface IUser extends mongoose.Model<IUser> {
	email: string;
	password: string;
	comparePassword(password: string): Promise<boolean>;
}
