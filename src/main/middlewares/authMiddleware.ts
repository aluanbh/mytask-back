// authMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import { jwtMiddleware } from './jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ statusCode: 401, message: 'Token not provided' });
	}

	try {
		const decoded = jwtMiddleware.verifyToken(token);

		if (!decoded) return res.status(401).json({ statusCode: 401, message: 'Invalid token' });

		if (decoded) (req as any).user = decoded;

		next();
	} catch (error) {
		return res.status(401).json({ statusCode: 401, message: 'Invalid token' });
	}
};
