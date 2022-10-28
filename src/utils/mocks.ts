import { HttpMethodEnum, PartialRecord } from "types"
import { ErrorResponse, IdRequest, NameRequest } from "interfaces"

type RequestType = IdRequest | NameRequest
type RequestFilePathFunction = (request?: Extract<any, RequestType>) => string

const FileLocationMap: PartialRecord<HttpMethodEnum, Record<string, RequestFilePathFunction>> = {
  POST: {
    "/users": (request: IdRequest) => {
      console.log(request)
      return ""
    }
  }
}

const isErrorResponse = (obj: any): obj is ErrorResponse => {
  return typeof obj === "object" && "status" in obj && "title" in obj && "description" in obj
}

export const loadMockData = <T, U = void>(
  method: HttpMethodEnum,
  path: string,
  request?: U
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    let filePath = `${path}/data.json`
    const methodMap = FileLocationMap[method]
    if (methodMap) {
      const methodPath = methodMap[path]
      if (methodPath) {
        filePath = methodPath(request)
      }
    }

    fetch(`/mocks${filePath}`)
      .then(res => res.json())
      .then(data => (isErrorResponse(data) ? reject(data) : resolve(data)))
      .catch(_ => reject("Unable to load mock data for request"))
  })
}
