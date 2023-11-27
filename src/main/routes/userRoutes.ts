import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapters';
import { getUsersController } from '../factories/user/getUsers';
import { authMiddleware } from '../middlewares/authMiddleware';

export default (router: Router): void => {
	router.get('/users', authMiddleware, adaptRoute(getUsersController()));
};
