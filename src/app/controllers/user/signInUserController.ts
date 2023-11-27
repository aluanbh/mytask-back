import { HttpResponse } from "@/app/protocols";
import { Controller } from "../controller";
import { ValidationBuilder } from "@/app/validation/builder";
import { Validator } from "@/app/validation";
import { mock } from "@/main/database/mock";
import { jwtMiddleware } from "@/main/middlewares";
import bcrypt from 'bcrypt';

export class SignInController extends Controller {
  private readonly secretKey = process.env.SECRET_KEY || 'secret'; // A chave secreta deve ser armazenada em uma variável de ambiente

  constructor() {
    super()
  }

  async perform(httpRequest: any): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    const user = mock.usersData.find(user => user.email === email);

    if (!user)
      return new Promise(resolve => resolve({ statusCode: 401, data: { message: 'User not found' } }))

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return new Promise(resolve => resolve({ statusCode: 401, data: { message: 'Invalid e-mail/password' } }))

    const token = jwtMiddleware.generateToken(user.id, user.name, user.email);
    const responseData = {
      success: true,
      token,
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return new Promise(resolve => resolve({ statusCode: 200, data: responseData }))
  }

  override buildValidators(httpRequest: any): Validator[] {
    return [
      ...ValidationBuilder.of({ value: httpRequest.body['email'], fieldName: 'email' }).required().email().build(),
      ...ValidationBuilder.of({ value: httpRequest.body['password'], fieldName: 'password' }).required().build()
    ]
  }

}