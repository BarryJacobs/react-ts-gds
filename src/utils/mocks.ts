import { HttpMethodEnum, PartialRecord } from "types"
import { IdRequest, NameRequest } from "interfaces"

type RequestType = IdRequest | NameRequest
type RequestFilePathFunction = (request?: Extract<any, RequestType>) => string

export const FileLocationMap: PartialRecord<
  HttpMethodEnum,
  Record<string, RequestFilePathFunction>
> = {
  POST: {
    "/users": (request: IdRequest) => {
      console.log(request)
      return ""
    }
  }
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
      .then(data => resolve(data))
      .catch(_ => reject("Unable to load mock data for request"))
  })
}
