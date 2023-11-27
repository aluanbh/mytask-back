import { RequiredStringValidator } from "@/app/validation"
import { ValidationBuilder } from "@/app/validation/builder"

describe('ValidationBuilder', () => {
  test('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name'})
      .required()
      .build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')])
  })
})