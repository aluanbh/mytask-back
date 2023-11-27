import { UsersController } from "@/app/controllers/user/usersController"

export const getUsersController = (): UsersController => {
  return new UsersController()
}