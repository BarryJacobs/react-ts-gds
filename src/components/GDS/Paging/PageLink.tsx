import React from "react"
import { Link } from "react-router-dom"

export interface PaginationLinkProps {
  assistiveText?: string
  rel?: "next" | "prev"
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  children?: React.ReactNode
}

function PageLink({ assistiveText, rel, onClick, children }: PaginationLinkProps) {
  const linkAttr = {
    "aria-label": assistiveText,
    className: "govuk-link govuk-pagination__link",
    rel
  }
  return (
    <Link to="#" {...linkAttr} onClick={onClick}>
      {children}
    </Link>
  )
}
export default PageLink
