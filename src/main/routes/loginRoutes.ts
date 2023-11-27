import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapters";
import { makeSignUpController } from "../factories/user/signUp";
import { makeSignInController } from "../factories/user/signIn";

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
}