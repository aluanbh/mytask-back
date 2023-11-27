import { Router } from "express";

export default (router: Router): void => {
  router.get('/', (_, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'Server is running!',
    timestamp: Date.now(),
    now: new Date().toLocaleString(),
  };
  res.send(healthCheck);
});
}