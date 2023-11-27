import { ServerError } from "@/app/errors";
import { HttpResponse } from "@/app/protocols";

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: new ServerError(error)
});