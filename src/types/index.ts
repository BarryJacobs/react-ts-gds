export enum HttpMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export type Dictionary<T> = Record<string, T>
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}
