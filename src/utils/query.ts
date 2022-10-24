import { QueryClient } from "@tanstack/react-query"

export const queryKeys = {
  users: "users"
}

export const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    logger: {
      log: () => {},
      warn: () => {},
      error: () => {}
    },
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
        cacheTime: Infinity
      },
      mutations: {}
    }
  })
}

export const queryClient = generateQueryClient()
