import { Validator } from "@/app/validation";
import { InvalidParamError } from "../errors";
import { ValidationEmail } from "../protocols/ValidationEmail";

export class EmailValidator implements Validator {
  constructor(
    private readonly value: any,
    private readonly fieldName: string,
    private readonly emailValidator: ValidationEmail
  ){}
  
  validate (): Error | undefined {
    const isValid = this.emailValidator.isValid({ value: this.value })
    if (!isValid){
      return new InvalidParamError(this.fieldName)
    }
  }
}



