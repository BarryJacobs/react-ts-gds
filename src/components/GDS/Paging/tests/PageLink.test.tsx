import { describe, expect, it, vi } from "vitest"
import { render, screen, configureAxeForReactComponents, extendExpectForAxe } from "utils/test"
import PageLink from "../PageLink"

extendExpectForAxe()

const mockOnClick = vi.fn()

describe("PageLink component is accessible", () => {
  it("default page link must not fail any accessibility tests", async () => {
    const { container } = render(
      <PageLink onClick={mockOnClick}>
        <>link text</>
      </PageLink>
    )

    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("assistive text page link must not fail any accessibility tests", async () => {
    const { container } = render(
      <PageLink onClick={mockOnClick} assistiveText="link assistive text" rel="next">
        <>link text</>
      </PageLink>
    )
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("PageLink renders correctly", () => {
  it("default page link renders correctly", async () => {
    render(
      <PageLink onClick={mockOnClick}>
        <>link text</>
      </PageLink>
    )
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass("govuk-link govuk-pagination__link")
  })

  it("page link renders correctly with assistive text", async () => {
    render(
      <PageLink onClick={mockOnClick} assistiveText="assistive link text">
        <>link text</>
      </PageLink>
    )
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("aria-label", "assistive link text")
  })

  it("page link renders correctly when rel set to prev", async () => {
    render(
      <PageLink onClick={mockOnClick} rel="prev">
        <>link text</>
      </PageLink>
    )
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("rel", "prev")
  })

  it("page link renders correctly when rel set to next", async () => {
    render(
      <PageLink onClick={mockOnClick} assistiveText="link assistive text" rel="next">
        <>link text</>
      </PageLink>
    )
    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("rel", "next")
  })
})
