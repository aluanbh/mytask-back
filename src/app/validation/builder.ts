import { EmailValidationAdapter } from "../utils/EmailValidationAdapter";
import { EmailValidator } from "./emailValidator";
import { DateValidator } from "./dateValidator";
import { RequiredStringValidator } from "./required";
import { Validator } from "./validator";
import { DateValidationAdapter } from "../utils/DateValidationAdapter";

export class ValidationBuilder {
  private constructor(
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ){}

  static of(params: { value: string, fieldName: string}): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required(): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validators.push(new EmailValidator(this.value, this.fieldName, new EmailValidationAdapter()))
    return this
  }

  date(): ValidationBuilder {
    this.validators.push(new DateValidator(this.value, this.fieldName, new DateValidationAdapter()))
    return this
  }

  build(): Validator[] {
    return this.validators
  }
}
