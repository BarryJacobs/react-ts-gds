import { Home, Users, usersLoader, Accordions, AutoCompletes, Dates } from "pages"
import { ReactElement } from "react"
import { ErrorBoundary } from "components"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "utils"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Page } from "layout"

const App = (): ReactElement => {
  const router = createBrowserRouter([
    {
      element: <Page />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/accordions",
          element: <Accordions />
        },
        {
          path: "/autocomplete",
          element: <AutoCompletes />
        },
        {
          path: "/dates",
          element: <Dates />
        },
        {
          path: "/users",
          element: <Users />,
          errorElement: <ErrorBoundary />,
          loader: usersLoader(queryClient)
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
