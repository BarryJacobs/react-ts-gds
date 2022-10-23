import { Home, Users } from "pages"
import { ReactElement } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "utils"
import { MakeGenerics, Router, ReactLocation, Outlet } from "@tanstack/react-location"
import { ReactLocationDevtools } from "@tanstack/react-location-devtools"
import { Header } from "components"

type LocationGenerics = MakeGenerics<{
  Params: never
}>

const location = new ReactLocation<LocationGenerics>()
const routes = [
  {
    path: "/",
    element: <Home />
  }
]

const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes}>
        <Header />
        <Outlet />
        <ReactLocationDevtools position={"bottom-left"} initialIsOpen={false} />
      </Router>
      <ReactQueryDevtools position={"bottom-right"} panelPosition={"right"} initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
