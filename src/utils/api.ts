import { ErrorResponse, User } from "interfaces"
import { HttpMethodEnum, StringDictionary } from "types"

const JsonHeaders: StringDictionary = {
  "Content-Type": "application/json",
  Accept: "application/json"
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

const request = async <T, U = void>(
  method: HttpMethodEnum,
  url: string,
  headers: StringDictionary,
  requestData?: U
): Promise<T> => {
  const fetchAttributes: RequestInit = { method }
  if (requestData) fetchAttributes["body"] = JSON.stringify(requestData)
  fetchAttributes["headers"] = headers

  return await fetch(`${url}`, fetchAttributes)
    .then(async response => {
      if (response.ok) {
        const responseData = await response.json()
        return responseData as T
      } else {
        return Promise.reject(JSON.parse(await response.text()))
      }
    })
    .catch((error: unknown) => {
      return Promise.reject(isErrorResponse(error) ? error : ConnectionError)
    })
}

export const getUsers = () =>
  request<User[]>(HttpMethodEnum.GET, "https://jsonplaceholder.typicode.com/users", JsonHeaders)
