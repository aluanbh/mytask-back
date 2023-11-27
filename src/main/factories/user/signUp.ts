import { SignUpController } from "@/app/controllers/user/signUpUserController"

export const makeSignUpController = (): SignUpController => {
  return new SignUpController()
}