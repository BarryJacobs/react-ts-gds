import { ReactNode } from "react"
import { Navbar } from "./Navbar"

interface PageProps {
  children: ReactNode
}

export const Page = ({ children }: PageProps) => {
  return (
    <div className="govuk-template__body">
      <header className="govuk-header app-header" role="banner" data-module="govuk-header">
        <div className="govuk-header__container app-width-container app-header__container">
          <div className="govuk-header__product-name">Vite React TanStack GDS Demo</div>
        </div>
      </header>
      <Navbar />
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper">{children}</main>
      </div>
    </div>
  )
}
