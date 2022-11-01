import { ErrorMessage } from "components"
import { useRouteError } from "react-router-dom"
import { ReactElement } from "react"
import { ErrorResponse } from "interfaces"

export const ErrorBoundary = (): ReactElement => {
  const error = useRouteError() as ErrorResponse
  return <ErrorMessage title={error.title} description={error.description} />
}
