import { ConnectionError, JsonHeaders } from "global/constants"
import { ErrorResponse } from "interfaces"
import { HttpMethodEnum, Dictionary } from "types"
import { loadMockData } from "utils"
import state from "global/state"

const isErrorResponse = (value: unknown): value is ErrorResponse => {
  const response = value as ErrorResponse
  return (
    typeof response === "object" &&
    response.status !== undefined &&
    response.title !== undefined &&
    response.description !== undefined
  )
}

interface RequestProps<U> {
  method: HttpMethodEnum
  path: string
  headers?: Dictionary<string>
  request?: U
  authorise?: boolean
}

export const request = async <T, U = void>({
  method,
  path,
  headers = JsonHeaders,
  request,
  authorise = true
}: RequestProps<U>): Promise<T> => {
  if (import.meta.env.VITE_USE_MOCK_API === "true") {
    return loadMockData<T, U>(method, path, request)
  }

  const fetchAttributes: RequestInit = { method }
  if (request) fetchAttributes["body"] = JSON.stringify(request)

  if (authorise) headers["Authorization"] = `Bearer ${state.bearerToken}`
  fetchAttributes["headers"] = headers

  return fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, fetchAttributes)
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
