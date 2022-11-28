import { ReactElement } from "react"
import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export const Page = (): ReactElement => {
  return (
    <div className="govuk-template__body js-enabled">
      <header className="govuk-header app-header" role="banner" data-module="govuk-header">
        <div className="govuk-header__container app-width-container app-header__container">
          <div className="govuk-header__product-name">Vite React GDS Demo</div>
        </div>
      </header>
      <Navbar />
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
