import { HttpResponse } from "@/app/protocols";
import { Controller } from "../controller";
import { ValidationBuilder } from "@/app/validation/builder";
import { Validator } from "@/app/validation";
import { mock } from "@/main/database/mock";
import fs from 'fs';
import bcrypt from 'bcrypt';

export class SignUpController extends Controller {
  constructor(){
    super()
  }

  async perform(httpRequest: any): Promise<HttpResponse> {
      const { name, email, password } = httpRequest.body;

      const user = mock.usersData.find(user => user.email === email);

      if (user) 
        return new Promise(resolve => resolve({ statusCode: 409, data: { message: 'E-mail já cadastrado' } }))

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        id: mock.usersData.length + 1,
        name,
        email,
        createdAt: new Date().toISOString().substring(0, 10),
        password: hashedPassword
      };
      
      mock.usersData.push(newUser);

      const updatedMockFileContent = `export const mock = ${JSON.stringify(mock, null, 2)};\n`;

      fs.writeFileSync('./src/main/database/mock.ts', updatedMockFileContent, 'utf-8');

      return new Promise(resolve => resolve({ statusCode: 201, data: { success: true, message: 'Usuário cadastrado com sucesso!' } }))
  }

  override buildValidators(httpRequest: any): Validator[] {
      return [
        ...ValidationBuilder.of({ value: httpRequest.body['name'], fieldName: 'name'}).required().build(),
        ...ValidationBuilder.of({ value: httpRequest.body['email'], fieldName: 'email'}).required().email().build()
      ]
  }

}