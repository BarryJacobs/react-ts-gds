import { Home, Users, usersLoader } from "pages"
import { ReactElement } from "react"
import { ErrorBoundary } from "components"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "utils"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useAuthorisation } from "hooks"
import { Page } from "layout"

const App = (): ReactElement => {
  const { jsonHeaders } = useAuthorisation()
  const router = createBrowserRouter([
    {
      element: <Page />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/users",
          element: <Users />,
          errorElement: <ErrorBoundary />,
          loader: usersLoader(queryClient, jsonHeaders)
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
