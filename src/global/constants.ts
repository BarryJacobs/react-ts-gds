import { ErrorResponse } from "interfaces"
import { Dictionary } from "types"

export const JsonHeaders: Dictionary<string> = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

export const ConnectionError: ErrorResponse = {
  status: 500,
  title: "There has been a problem with the server",
  description: "Please try again later"
}
