import { QueryClient } from "@tanstack/react-query"

export const queryKeys = {
  users: "users"
}

const generateQueryClient = (): QueryClient => {
  return new QueryClient({
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
