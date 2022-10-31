import { ReactElement } from "react"

interface ErrorMessageProps {
  title: string
  description: string
}

export const ErrorMessage = ({ title, description }: ErrorMessageProps): ReactElement => {
  return (
    <div
      className="govuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      data-disable-auto-focus="true"
      data-module="govuk-error-summary">
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        {title}
      </h2>
      <div className="govuk-error-summary__body">{description}</div>
    </div>
  )
}
