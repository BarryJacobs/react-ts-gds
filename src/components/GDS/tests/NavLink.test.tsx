import { describe, expect, it } from "vitest"
import { render, screen, configureAxeForReactComponents, extendExpectForAxe } from "utils/test"
import { NavLink } from "../NavLink"

extendExpectForAxe()

describe("NavLink component is accessible", () => {
  it("default internal link must not fail any accessibility tests", async () => {
    const { container } = render(<NavLink to="/test" text="test link" />)
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("internal link with assistive text must not fail any accessibility tests", async () => {
    const { container } = render(<NavLink to="/test" text="test link" assistiveText="test page" />)
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("default external link must not fail any accessibility tests", async () => {
    const { container } = render(
      <NavLink to="https://www.google.co.uk" text="test link" external />
    )
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("external link with assistive text must not fail any accessibility tests", async () => {
    const { container } = render(
      <NavLink
        to="https://www.google.co.uk"
        text="test link"
        external
        assistiveText="Search using google"
      />
    )
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("NavLink renders correctly", () => {
  it("default internal link renders correctly", async () => {
    render(<NavLink to="/test" text="test link" />)
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
    expect(link).toHaveClass("govuk-link")
  })

  it("internal link with assistive text renders correctly", async () => {
    render(<NavLink to="/test" text="test link" assistiveText="test page" />)
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("aria-label", "test page")
  })

  it("default external link renders correctly", async () => {
    render(<NavLink to="https://www.google.co.uk" text="test link" external />)
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "https://www.google.co.uk")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noreferrer")
    expect(link).toHaveClass("govuk-link")
  })

  it("external link with assistive text renders correctly", async () => {
    render(
      <NavLink
        to="https://www.google.co.uk"
        text="test link"
        external
        assistiveText="Search using google"
      />
    )
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("aria-label", "Search using google")
  })

  it("internal link with overriden class renders correctly", async () => {
    render(<NavLink to="/test" text="test link" overrideClass="override-css" />)
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass("override-css")
  })

  it("external link with overriden class renders correctly", async () => {
    render(
      <NavLink
        to="https://www.google.co.uk"
        text="test link"
        external
        overrideClass="override-css"
      />
    )
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass("override-css")
  })
})
