import { HttpResponse } from "@/app/protocols"
import { badRequest, serverError } from "../helpers"
import { Validator } from "@/app/validation"
import { ValidationComposite } from "../validation/composite"

export abstract class Controller {
  abstract perform(httpRequest:any): Promise<HttpResponse>
  buildValidators(httpRequest: any): Validator[] {
    return []
  }

	async handle(httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)

    if (error) {
      return badRequest(error)
    }

    try {
      return await this.perform(httpRequest)
    } catch(error) {
      return serverError(error as Error)
    }
  }

  private validate(httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}