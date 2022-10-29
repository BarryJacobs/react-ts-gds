import { Home, Users } from "pages"
import { ReactElement } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "utils"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Page } from "layout"

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
        element: <Users />
      }
    ]
  }
])

const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
