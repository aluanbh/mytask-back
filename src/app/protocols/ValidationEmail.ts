export interface ValidationEmail {
  isValid(params: ValidationEmail.Params): ValidationEmail.Result
}

export namespace ValidationEmail {
  export type Params = {
    value: string,
  }

  export type Result = Boolean
}
