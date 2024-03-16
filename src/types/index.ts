export enum HttpMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export enum GDSSize {
  small = "s",
  medium = "m",
  large = "l",
  extraLarge = "xl"
}

export type Dictionary<T> = Record<string, T>
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

export type AuthorisationHeaders = Dictionary<string> & {
  ["Authorization"]: string
}

export interface Option {
  label: string
  value: string
}
