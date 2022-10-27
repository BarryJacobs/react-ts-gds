import { ErrorResponse, User } from "interfaces"
import { HttpMethodEnum, Dictionary } from "types"
import { loadMockData } from "utils"

const JsonHeaders: Dictionary<string> = {
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
  path: string,
  headers: Dictionary<string>,
  request?: U
): Promise<T> => {
  if (import.meta.env.VITE_USE_MOCK_API === "true") {
    return loadMockData<T>(method, path)
  }

  const fetchAttributes: RequestInit = { method }
  if (request) fetchAttributes["body"] = JSON.stringify(request)
  fetchAttributes["headers"] = headers

  return await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, fetchAttributes)
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

export const getUsers = () => request<User[]>(HttpMethodEnum.GET, "/users", JsonHeaders)
