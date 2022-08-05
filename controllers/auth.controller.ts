import { Request, Response } from 'express';

export const register = (req: Request, res: Response) => {
	console.log(req.body);
	res.json({ ok: 'Register' });
};

export const login = (req: Request, res: Response) => {
	res.json({ ok: 'Login' });
};
