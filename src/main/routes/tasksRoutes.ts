import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapters';
import { authMiddleware } from '../middlewares/authMiddleware';
import { tasksController } from '../factories/tasks/tasks';

export default (router: Router): void => {
	router.get('/tasks', authMiddleware, adaptRoute(tasksController()));
	router.get('/tasks/:id', authMiddleware, adaptRoute(tasksController()));
	router.post('/tasks', authMiddleware, adaptRoute(tasksController()));
	router.put('/tasks/:id', authMiddleware, adaptRoute(tasksController()));
	router.delete('/tasks/:id', authMiddleware, adaptRoute(tasksController()));
};
