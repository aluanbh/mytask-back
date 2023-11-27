import { Express, json } from 'express';
import { cors, swagger, swaggerBaseURL, swaggerDocument } from '@/main/middlewares';

export const setupMiddlewares = (app: Express): void => {
	app.use(cors);
	app.use(json());
	app.use(swaggerBaseURL, swagger.serve, swagger.setup(swaggerDocument));
};
