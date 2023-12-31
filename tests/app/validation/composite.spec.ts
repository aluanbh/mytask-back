import { Validator } from "@/app/validation"
import { ValidationComposite } from "@/app/validation/composite"
import { MockProxy, mock } from "jest-mock-extended"

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  let validator1: MockProxy<Validator>
  let validator2: MockProxy<Validator>
  let validators: Validator[]

  beforeAll(() => {
    validator1 = mock()
    validator1.validate.mockReturnValue(undefined)
    validator2 = mock()
    validator2.validate.mockReturnValue(undefined)
    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  test('should return undefined if all Validators returns undefined', () => {
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('should return the first error', () => {
    validator1.validate.mockReturnValueOnce(new Error('error_1'))
    validator2.validate.mockReturnValueOnce(new Error('error_2'))

    const error = sut.validate()

    expect(error).toEqual(new Error('error_1'))
  })

  test('should return the error', () => {
    validator2.validate.mockReturnValueOnce(new Error('error_2'))

    const error = sut.validate()

    expect(error).toEqual(new Error('error_2'))
  })

})
