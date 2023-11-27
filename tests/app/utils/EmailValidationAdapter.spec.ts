import { EmailValidationAdapter } from "@/app/utils/EmailValidationAdapter"

import validator from "validator"

jest.mock('validator')

describe('EmailValidationAdapter', () => {
  let sut: EmailValidationAdapter
  let fakeValidator: jest.Mocked<typeof validator>

  beforeAll(() => {
    fakeValidator = validator as jest.Mocked<typeof validator>
    fakeValidator.isEmail.mockReturnValue(true)
  })

  beforeEach(() => {
    sut = new EmailValidationAdapter()
  })

  test('should call validator with correct values', async() => {
    await sut.isValid({ value: 'any_email@gmail.com'})

    expect(fakeValidator.isEmail).toHaveBeenCalledWith('any_email@gmail.com')
  })  

  test('should return false if validator returns false', async() => {
    fakeValidator.isEmail.mockReturnValueOnce(false)

    const isValid = await sut.isValid({ value: 'any_email@gmail.com'})

    expect(isValid).toBeFalsy()
  }) 
  
  test('should return true if validator returns true', async() => {
    const isValid = await sut.isValid({ value: 'any_email@gmail.com'})

    expect(isValid).toBeTruthy()
  }) 
})
