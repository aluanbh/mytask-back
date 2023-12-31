import { Express, Router } from 'express'
import fg from 'fast-glob'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/', router)
  fg.sync('**/src/main/routes/**Routes.ts').map(async file => {
    (await import(`../../../${file}`)).default(router)
  })
}