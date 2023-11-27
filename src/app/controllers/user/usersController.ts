import { HttpResponse } from "@/app/protocols";
import { Controller } from "../controller";
import { mock } from "@/main/database/mock";

export class UsersController extends Controller {
  constructor(){
    super()
  }

  perform(httpRequest: any): Promise<HttpResponse> {
    const users = mock.usersData;

    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    })

    return new Promise(resolve => resolve({ statusCode: 200, data: usersWithoutPassword }))
      
  }

}