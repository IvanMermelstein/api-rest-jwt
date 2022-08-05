import express from 'express';
import { body } from 'express-validator';
import { login, register } from './../controllers/auth.controller.js';
import { validationResultExpress } from './../middlewares/validationResultExpress.js';

const router = express.Router();

router.post(
	'/register',
	[
		body('email', 'The email format is incorrect')
			.trim()
			.isEmail()
			.normalizeEmail(),
		body('password', 'The password must be at least 6 characters')
			.trim()
			.isLength({
				min: 6
			}),
		body('password').custom((value, { req }) => {
			if (value !== req.body.passwordConfirm) {
				throw new Error('Passwords do not match');
			}
			return true;
		})
	],
	validationResultExpress,
	register
);

router.post(
	'/login',
	[
		body('email', 'The email format is incorrect')
			.trim()
			.isEmail()
			.normalizeEmail(),
		body('password', 'The password must be at least 6 characters')
			.trim()
			.isLength({
				min: 6
			})
	],
	validationResultExpress,
	login
);

export default router;
