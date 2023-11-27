export interface ValidationDate {
  isValid(params: ValidationDate.Params): ValidationDate.Result
}

export namespace ValidationDate {
  export type Params = {
    value: string,
  }

  export type Result = Boolean
}
