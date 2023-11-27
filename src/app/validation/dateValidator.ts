import { ValidationDate } from "../protocols/ValidationDate";
import { Validator } from "./validator";

export class DateValidator implements Validator {
  constructor(
    private readonly value: string, 
    private readonly fieldName: string,
    private readonly dateValidator: ValidationDate
  ) {}

  validate(): Error | undefined {
    const isValid = this.dateValidator.isValid({ value: this.value })
    
    if (!isValid){
      return new Error(`The field ${this.fieldName} is not a valid date`)
    }
  }
}
