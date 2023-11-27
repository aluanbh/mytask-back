import { HttpResponse } from "@/app/protocols"

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    data: error
  }
}