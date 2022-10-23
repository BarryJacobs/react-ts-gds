import React from "react"
import { Link } from "@tanstack/react-location"

export interface NavLinkProps {
  to: string
  text: string
  assistiveText?: string
  external?: boolean
  overrideClass?: string
}

export function NavLink({
  to,
  text,
  assistiveText,
  external,
  overrideClass
}: NavLinkProps & React.HTMLProps<HTMLLinkElement>) {
  const navAttr = {
    "aria-label": assistiveText,
    className: overrideClass || "govuk-link"
  }
  return (
    <>
      {external ? (
        <a href={to} target="_blank" rel="noreferrer" {...navAttr}>
          {text}
        </a>
      ) : (
        <Link to={to} {...navAttr}>
          {text}
        </Link>
      )}
    </>
  )
}
