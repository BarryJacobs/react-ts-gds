export const concatenateStrings = (separator: string, ...args: string[]): string => {
  let result = ""
  if (args && args.length !== 0) {
    args.forEach(
      value => (result += value ? (result.length === 0 ? value : separator + value) : "")
    )
  }
  return result
}

export { queryKeys, queryClient } from "./query"
export { loadMockData } from "./mocks"
export { getUsers } from "./api"
