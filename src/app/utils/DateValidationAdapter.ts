import { ValidationDate } from "../protocols/ValidationDate";

import validator from "validator"

export class DateValidationAdapter implements ValidationDate {
  isValid(params: ValidationDate.Params): ValidationDate.Result {
    const valid = validator.isDate(params.value)
    return valid
  }
}