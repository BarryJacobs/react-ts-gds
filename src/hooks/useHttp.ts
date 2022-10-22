import { ErrorResponse } from "interfaces"

enum HttpMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

const ConnectionError: ErrorResponse = {
  status: 500,
  title: "There has been a problem with the server",
  description: "Please try again later"
}

const isErrorResponse = (value: unknown): value is ErrorResponse => {
  const response = value as ErrorResponse
  return (
    typeof response === "object" &&
    response.status !== undefined &&
    response.title !== undefined &&
    response.description !== undefined
  )
}

export const useHttp = () => {
  const request = async <T, U>(
    method: HttpMethodEnum,
    url: string,
    requestData?: T
  ): Promise<U | ErrorResponse> => {
    const fetchAttributes: RequestInit = { method }
    if (requestData) fetchAttributes["body"] = JSON.stringify(requestData)

    const response: Response = await fetch(`${url}`, fetchAttributes)
    if (response.ok) {
      const responseData = await response.json()
      return responseData as U
    } else {
      try {
        const serverError = JSON.parse(await response.text())
        return Promise.reject(
          serverError && isErrorResponse(serverError) ? serverError : ConnectionError
        )
      } catch (error) {
        return Promise.reject(ConnectionError)
      }
    }
  }

  return { request }
}
