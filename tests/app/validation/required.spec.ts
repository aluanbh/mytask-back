import { MissingParamError } from "@/app/errors"
import { RequiredStringValidator } from "@/app/validation"

describe('Required', () => {
  test('should return MissingParamError If values is empty', () => {
    const sut = new RequiredStringValidator('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('should return MissingParamError if value is null', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('should return MissingParamError if value is undefined', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('should return undefined if value is not empty', () => {
    const sut = new RequiredStringValidator('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
