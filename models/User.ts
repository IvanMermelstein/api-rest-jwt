import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { IUser } from '../interfaces/interfaces';

const userSchema = new mongoose.Schema<IUser>({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
		index: { unique: true }
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		throw new Error('Password hashing failed');
	}
});

userSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
