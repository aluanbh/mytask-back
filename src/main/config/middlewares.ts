import { Express, json } from 'express'
import { cors } from '@/main/middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors)
  app.use(json())
}