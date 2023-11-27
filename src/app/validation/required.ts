import { Validator } from "@/app/validation";
import { MissingParamError } from "../errors";

export class RequiredStringValidator implements Validator {
  constructor(
    private readonly value: any,
    private readonly fieldName: string
  ){}
  validate (): Error | undefined {
    if(this.value === '' || this.value === null || this.value === undefined){
      return new MissingParamError(this.fieldName) 
    }
  }
}