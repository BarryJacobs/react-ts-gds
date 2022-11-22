import { HttpMethodEnum, PartialRecord } from "types"
import { ErrorResponse, IdRequest, NameRequest } from "interfaces"

type RequestType = IdRequest | NameRequest
type RequestFilePathFunction = (path: string, request?: Extract<any, RequestType>) => string
type MethodMap = Record<string, RequestFilePathFunction>

const FileLocationMap: PartialRecord<HttpMethodEnum, MethodMap> = {
  POST: {
    "^/posts$": (path: string, request: IdRequest) => {
      console.log(path, request)
      return ""
    }
  },
  GET: {
    "^/users$": (path: string) => {
      return `${path}/data.json`
    }
  }
}

const getMethodPath = <T>(path: string, methodMap: MethodMap, request: T): string => {
  const expressions = Object.keys(methodMap)
  const match = expressions.find(exp => RegExp(path).test(exp))
  return match ? methodMap[match](path, request) : ""
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
      const methodPath = getMethodPath(path, methodMap, request)
      if (methodPath) {
        filePath = methodPath
      }
    }

    fetch(`/mocks${filePath}`)
      .then(res => res.json())
      .then(data => (isErrorResponse(data) ? reject(data) : resolve(data)))
      .catch(_ =>
        reject({
          title: "There has been a problem",
          description: `Unable to load mock data for file at location: ${filePath}`
        })
      )
  })
}
