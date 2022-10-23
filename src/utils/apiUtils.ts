import { ErrorResponse, User } from "interfaces"
import { HttpMethodEnum } from "types"

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

// TODO: Can we access state inside this fn e.g: header data

const request = async <T, U = void>(
  method: HttpMethodEnum,
  url: string,
  requestData?: U
): Promise<T> => {
  const fetchAttributes: RequestInit = { method }
  if (requestData) fetchAttributes["body"] = JSON.stringify(requestData)
  return await fetch(`${url}`, fetchAttributes)
    .then(async response => {
      if (response.ok) {
        const responseData = await response.json()
        return responseData as T
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
    })
    .catch(_ => {
      return Promise.reject(ConnectionError)
    })
}

export const getUsers = () =>
  request<User[]>(HttpMethodEnum.GET, "https://jsonplaceholder.typicode.com/users")
