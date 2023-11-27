import { SignInController } from "@/app/controllers/user/signInUserController"

export const makeSignInController = (): SignInController => {
  return new SignInController()
}