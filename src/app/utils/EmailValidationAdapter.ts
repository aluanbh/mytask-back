import { ValidationEmail } from "../protocols/ValidationEmail";

import validator from "validator"


export class EmailValidationAdapter implements ValidationEmail {
  isValid(params: ValidationEmail.Params): ValidationEmail.Result {
    const valid = validator.isEmail(params.value)
    return valid
  }
}