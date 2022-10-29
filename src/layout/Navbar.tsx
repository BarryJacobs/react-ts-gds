import { ReactElement } from "react"
import { NavLink } from "components"

export const Navbar = (): ReactElement => {
  return (
    <nav
      id="app-navigation"
      className="app-navigation govuk-clearfix"
      role="navigation"
      aria-labelledby="app-navigation-heading">
      <h2 className="govuk-visually-hidden" id="app-navigation-heading">
        Menu
      </h2>
      <ul className="app-navigation__list app-width-container">
        <li className="app-navigation__list-item ">
          <NavLink to="/" text="Home" />
        </li>
        <li className="app-navigation__list-item ">
          <NavLink to="/users" text="Table" />
        </li>
        <li className="app-navigation__list-item ">
          <NavLink to="/users" text="Accordion" />
        </li>
      </ul>
    </nav>
  )
}
