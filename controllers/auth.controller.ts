import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export interface CustomError {
	code: number;
}

export const register = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		// manual error
		let user = await User.findOne({ email });
		if (user) throw { code: 11000 };

		user = new User({ email, password });
		await user.save();

		return res.status(201).json({ ok: true });
	} catch (error) {
		// mongoose error
		if ((error as CustomError).code === 11000) {
			return res.status(400).json({ error: 'User already exists' });
		}

		return res.status(500).json({ error: 'Server error' });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		const isMatch = await user?.comparePassword(password);

		if (!user || !isMatch)
			return res
				.status(403)
				.json({ error: 'Credentials are not correct' });

		const token = jwt.sign(
			{ uid: user._id },
			process.env.JWT_SECRET as string
		);

		return res.json({ token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Server error' });
	}
};
