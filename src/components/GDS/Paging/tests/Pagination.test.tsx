import { describe, expect, it, vi } from "vitest"
import {
  render,
  screen,
  extendExpectForAxe,
  configureAxeForReactComponents,
  userEvent
} from "utils/test"
import Pagination from "../Pagination"

extendExpectForAxe()

const mockOnPageChange = vi.fn()

describe("Pagination component is accessible", () => {
  it("standard mid point pagination with next and prev must not fail any accessibility tests", async () => {
    const { container } = render(
      <Pagination
        pageNumbers={5}
        currentPage={3}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("standard mid point pagination with only next must not fail any accessibility tests", async () => {
    const { container } = render(
      <Pagination
        pageNumbers={5}
        currentPage={1}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("standard mid point pagination with only prev must not fail any accessibility tests", async () => {
    const { container } = render(
      <Pagination
        pageNumbers={5}
        currentPage={5}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("large result set must not fail any accessibility tests", async () => {
    const { container } = render(
      <Pagination
        pageNumbers={20}
        currentPage={10}
        label="results 4"
        onPageChange={mockOnPageChange}
      />
    )
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("small result set must not fail any accessibility tests", async () => {
    const { container } = render(
      <Pagination
        pageNumbers={3}
        currentPage={1}
        label="results 5"
        onPageChange={mockOnPageChange}
      />
    )
    const axe = configureAxeForReactComponents()
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe("Pagination renders correctly", () => {
  it("standard mid point pagination with next and prev renders correctly", async () => {
    render(
      <Pagination
        pageNumbers={5}
        currentPage={3}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )

    const paginationWrapper = screen.getByRole("navigation")
    expect(paginationWrapper).toBeInTheDocument()
    expect(paginationWrapper).toHaveClass("govuk-pagination")
    expect(paginationWrapper).toHaveAttribute("aria-label", "results 1")

    const paginationPreviousText = screen.getByText("Previous")
    expect(paginationPreviousText).toBeInTheDocument()
    expect(paginationPreviousText).toHaveClass("govuk-pagination__link-title")
    const paginationPreviousLink = paginationPreviousText.parentNode as HTMLElement
    expect(paginationPreviousLink).toBeInTheDocument()
    expect(paginationPreviousLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(paginationPreviousLink).toHaveAttribute("rel", "prev")

    const paginationNextText = screen.getByText("Next")
    expect(paginationNextText).toBeInTheDocument()
    expect(paginationNextText).toHaveClass("govuk-pagination__link-title")
    const paginationNextLink = paginationNextText.parentNode as HTMLElement
    expect(paginationNextLink).toBeInTheDocument()
    expect(paginationNextLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(paginationNextLink).toHaveAttribute("rel", "next")

    const paginationPagesList = screen.getByRole("list")
    expect(paginationPagesList).toBeInTheDocument()
    expect(paginationPagesList).toHaveClass("govuk-pagination__list")
    const paginationPagesItems = screen.getAllByRole("listitem")
    expect(paginationPagesItems).toHaveLength(5)

    expect(paginationPagesItems[0]).toHaveClass("govuk-pagination__item")
    const page1Link = paginationPagesItems[0].firstChild as HTMLElement
    expect(page1Link).toBeInTheDocument()
    expect(page1Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page1Link).toHaveAttribute("aria-label", "Page 1")
    expect(page1Link).toHaveTextContent("1")

    expect(paginationPagesItems[1]).toHaveClass("govuk-pagination__item")
    const page2Link = paginationPagesItems[1].firstChild as HTMLElement
    expect(page2Link).toBeInTheDocument()
    expect(page2Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page2Link).toHaveAttribute("aria-label", "Page 2")
    expect(page2Link).toHaveTextContent("2")

    expect(paginationPagesItems[2]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    const page3Link = paginationPagesItems[2].firstChild as HTMLElement
    expect(page3Link).toBeInTheDocument()
    expect(page3Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page3Link).toHaveAttribute("aria-label", "Page 3")
    expect(page3Link).toHaveTextContent("3")

    expect(paginationPagesItems[3]).toHaveClass("govuk-pagination__item")
    const page4Link = paginationPagesItems[3].firstChild as HTMLElement
    expect(page4Link).toBeInTheDocument()
    expect(page4Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page4Link).toHaveAttribute("aria-label", "Page 4")
    expect(page4Link).toHaveTextContent("4")

    expect(paginationPagesItems[4]).toHaveClass("govuk-pagination__item")
    const page5Link = paginationPagesItems[4].firstChild as HTMLElement
    expect(page5Link).toBeInTheDocument()
    expect(page5Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page5Link).toHaveAttribute("aria-label", "Page 5")
    expect(page5Link).toHaveTextContent("5")
  })

  it("standard mid point pagination with only next renders correctly", async () => {
    render(
      <Pagination
        pageNumbers={5}
        currentPage={1}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )

    const paginationWrapper = screen.getByRole("navigation")
    expect(paginationWrapper).toBeInTheDocument()
    expect(paginationWrapper).toHaveClass("govuk-pagination")
    expect(paginationWrapper).toHaveAttribute("aria-label", "results 1")

    const paginationPreviousText = screen.queryByText("Previous")
    expect(paginationPreviousText).not.toBeInTheDocument()

    const paginationNextText = screen.getByText("Next")
    expect(paginationNextText).toBeInTheDocument()
    expect(paginationNextText).toHaveClass("govuk-pagination__link-title")
    const paginationNextLink = paginationNextText.parentNode as HTMLElement
    expect(paginationNextLink).toBeInTheDocument()
    expect(paginationNextLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(paginationNextLink).toHaveAttribute("rel", "next")

    const paginationPagesList = screen.getByRole("list")
    expect(paginationPagesList).toBeInTheDocument()
    expect(paginationPagesList).toHaveClass("govuk-pagination__list")
    const paginationPagesItems = screen.getAllByRole("listitem")
    expect(paginationPagesItems).toHaveLength(5)

    expect(paginationPagesItems[0]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    const page1Link = paginationPagesItems[0].firstChild as HTMLElement
    expect(page1Link).toBeInTheDocument()
    expect(page1Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page1Link).toHaveAttribute("aria-label", "Page 1")
    expect(page1Link).toHaveTextContent("1")

    expect(paginationPagesItems[1]).toHaveClass("govuk-pagination__item")
    const page2Link = paginationPagesItems[1].firstChild as HTMLElement
    expect(page2Link).toBeInTheDocument()
    expect(page2Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page2Link).toHaveAttribute("aria-label", "Page 2")
    expect(page2Link).toHaveTextContent("2")

    expect(paginationPagesItems[2]).toHaveClass("govuk-pagination__item")
    const page3Link = paginationPagesItems[2].firstChild as HTMLElement
    expect(page3Link).toBeInTheDocument()
    expect(page3Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page3Link).toHaveAttribute("aria-label", "Page 3")
    expect(page3Link).toHaveTextContent("3")

    expect(paginationPagesItems[3]).toHaveClass("govuk-pagination__item")
    const page4Link = paginationPagesItems[3].firstChild as HTMLElement
    expect(page4Link).toBeInTheDocument()
    expect(page4Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page4Link).toHaveAttribute("aria-label", "Page 4")
    expect(page4Link).toHaveTextContent("4")

    expect(paginationPagesItems[4]).toHaveClass("govuk-pagination__item")
    const page5Link = paginationPagesItems[4].firstChild as HTMLElement
    expect(page5Link).toBeInTheDocument()
    expect(page5Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page5Link).toHaveAttribute("aria-label", "Page 5")
    expect(page5Link).toHaveTextContent("5")
  })

  it("standard mid point pagination with only prev renders correctly", async () => {
    render(
      <Pagination
        pageNumbers={5}
        currentPage={5}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )

    const paginationWrapper = screen.getByRole("navigation")
    expect(paginationWrapper).toBeInTheDocument()
    expect(paginationWrapper).toHaveClass("govuk-pagination")
    expect(paginationWrapper).toHaveAttribute("aria-label", "results 1")

    const paginationPreviousText = screen.getByText("Previous")
    expect(paginationPreviousText).toBeInTheDocument()
    expect(paginationPreviousText).toHaveClass("govuk-pagination__link-title")
    const paginationPreviousLink = paginationPreviousText.parentNode as HTMLElement
    expect(paginationPreviousLink).toBeInTheDocument()
    expect(paginationPreviousLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(paginationPreviousLink).toHaveAttribute("rel", "prev")

    const paginationNextText = screen.queryByText("Next")
    expect(paginationNextText).not.toBeInTheDocument()

    const paginationPagesList = screen.getByRole("list")
    expect(paginationPagesList).toBeInTheDocument()
    expect(paginationPagesList).toHaveClass("govuk-pagination__list")
    const paginationPagesItems = screen.getAllByRole("listitem")
    expect(paginationPagesItems).toHaveLength(5)

    expect(paginationPagesItems[0]).toHaveClass("govuk-pagination__item")
    const page1Link = paginationPagesItems[0].firstChild as HTMLElement
    expect(page1Link).toBeInTheDocument()
    expect(page1Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page1Link).toHaveAttribute("aria-label", "Page 1")
    expect(page1Link).toHaveTextContent("1")

    expect(paginationPagesItems[1]).toHaveClass("govuk-pagination__item")
    const page2Link = paginationPagesItems[1].firstChild as HTMLElement
    expect(page2Link).toBeInTheDocument()
    expect(page2Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page2Link).toHaveAttribute("aria-label", "Page 2")
    expect(page2Link).toHaveTextContent("2")

    expect(paginationPagesItems[2]).toHaveClass("govuk-pagination__item")
    const page3Link = paginationPagesItems[2].firstChild as HTMLElement
    expect(page3Link).toBeInTheDocument()
    expect(page3Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page3Link).toHaveAttribute("aria-label", "Page 3")
    expect(page3Link).toHaveTextContent("3")

    expect(paginationPagesItems[3]).toHaveClass("govuk-pagination__item")
    const page4Link = paginationPagesItems[3].firstChild as HTMLElement
    expect(page4Link).toBeInTheDocument()
    expect(page4Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page4Link).toHaveAttribute("aria-label", "Page 4")
    expect(page4Link).toHaveTextContent("4")

    expect(paginationPagesItems[4]).toHaveClass(
      "govuk-pagination__item  govuk-pagination__item--current"
    )
    const page5Link = paginationPagesItems[4].firstChild as HTMLElement
    expect(page5Link).toBeInTheDocument()
    expect(page5Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page5Link).toHaveAttribute("aria-label", "Page 5")
    expect(page5Link).toHaveTextContent("5")
  })

  it("large result set renders correctly", async () => {
    render(
      <Pagination
        pageNumbers={20}
        currentPage={10}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )
    const paginationWrapper = screen.getByRole("navigation")
    expect(paginationWrapper).toBeInTheDocument()
    expect(paginationWrapper).toHaveClass("govuk-pagination")
    expect(paginationWrapper).toHaveAttribute("aria-label", "results 1")

    const paginationPreviousText = screen.getByText("Previous")
    expect(paginationPreviousText).toBeInTheDocument()
    expect(paginationPreviousText).toHaveClass("govuk-pagination__link-title")
    const paginationPreviousLink = paginationPreviousText.parentNode as HTMLElement
    expect(paginationPreviousLink).toBeInTheDocument()
    expect(paginationPreviousLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(paginationPreviousLink).toHaveAttribute("rel", "prev")

    const paginationNextText = screen.getByText("Next")
    expect(paginationNextText).toBeInTheDocument()
    expect(paginationNextText).toHaveClass("govuk-pagination__link-title")
    const paginationNextLink = paginationNextText.parentNode as HTMLElement
    expect(paginationNextLink).toBeInTheDocument()
    expect(paginationNextLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(paginationNextLink).toHaveAttribute("rel", "next")

    const paginationPagesList = screen.getByRole("list")
    expect(paginationPagesList).toBeInTheDocument()
    expect(paginationPagesList).toHaveClass("govuk-pagination__list")
    const paginationPagesItems = screen.getAllByRole("listitem", {
      hidden: true
    })
    expect(paginationPagesItems).toHaveLength(7)

    expect(paginationPagesItems[0]).toHaveClass("govuk-pagination__item")
    const page1Link = paginationPagesItems[0].firstChild as HTMLElement
    expect(page1Link).toBeInTheDocument()
    expect(page1Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page1Link).toHaveAttribute("aria-label", "Page 1")
    expect(page1Link).toHaveTextContent("1")

    expect(paginationPagesItems[1]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--ellipses"
    )
    expect(paginationPagesItems[1]).toHaveTextContent("...")

    expect(paginationPagesItems[2]).toHaveClass("govuk-pagination__item")
    const pageMidLeftLink = paginationPagesItems[2].firstChild as HTMLElement
    expect(pageMidLeftLink).toBeInTheDocument()
    expect(pageMidLeftLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(pageMidLeftLink).toHaveAttribute("aria-label", "Page 9")
    expect(pageMidLeftLink).toHaveTextContent("9")

    expect(paginationPagesItems[3]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    const pageMidLink = paginationPagesItems[3].firstChild as HTMLElement
    expect(pageMidLink).toBeInTheDocument()
    expect(pageMidLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(pageMidLink).toHaveAttribute("aria-label", "Page 10")
    expect(pageMidLink).toHaveTextContent("10")

    expect(paginationPagesItems[4]).toHaveClass("govuk-pagination__item")
    const pageRightLeftLink = paginationPagesItems[4].firstChild as HTMLElement
    expect(pageRightLeftLink).toBeInTheDocument()
    expect(pageRightLeftLink).toHaveClass("govuk-link govuk-pagination__link")
    expect(pageRightLeftLink).toHaveAttribute("aria-label", "Page 11")
    expect(pageRightLeftLink).toHaveTextContent("11")

    expect(paginationPagesItems[5]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--ellipses"
    )
    expect(paginationPagesItems[5]).toHaveTextContent("...")

    expect(paginationPagesItems[6]).toHaveClass("govuk-pagination__item")
    const page20Link = paginationPagesItems[6].firstChild as HTMLElement
    expect(page20Link).toBeInTheDocument()
    expect(page20Link).toHaveClass("govuk-link govuk-pagination__link")
    expect(page20Link).toHaveAttribute("aria-label", "Page 20")
    expect(page20Link).toHaveTextContent("20")
  })

  it("small result set renders correctly", async () => {
    render(
      <Pagination
        pageNumbers={3}
        currentPage={2}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )
    const paginationWrapper = screen.getByRole("navigation")
    expect(paginationWrapper).toBeInTheDocument()
    expect(paginationWrapper).toHaveClass("govuk-pagination govuk-pagination--block")
    expect(paginationWrapper).toHaveAttribute("aria-label", "results 1")

    const navigationLinks = screen.getAllByRole("link")
    expect(navigationLinks).toHaveLength(2)

    expect(navigationLinks[0]).toHaveClass("govuk-link govuk-pagination__link")
    expect(navigationLinks[0]).toHaveAttribute("rel", "prev")
    const navLeftElements = navigationLinks[0].childNodes

    expect(navLeftElements).toHaveLength(3)
    expect(navLeftElements[1]).toHaveClass("govuk-pagination__link-title")
    expect(navLeftElements[1]).toHaveTextContent("Previous")
    expect(navLeftElements[2]).toHaveClass("govuk-pagination__link-label")
    expect(navLeftElements[2]).toHaveTextContent("1 of 3")

    const navRightElements = navigationLinks[1].childNodes

    expect(navRightElements).toHaveLength(3)
    expect(navRightElements[1]).toHaveClass("govuk-pagination__link-title")
    expect(navRightElements[1]).toHaveTextContent("Next")
    expect(navRightElements[2]).toHaveClass("govuk-pagination__link-label")
    expect(navRightElements[2]).toHaveTextContent("3 of 3")
  })
})

describe("Pagination functions correctly", () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it("standard mid point pagination page click functions correctly", async () => {
    render(
      <Pagination
        pageNumbers={5}
        currentPage={3}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )

    const paginationPreviousText = screen.getByText("Previous")
    expect(paginationPreviousText).toBeInTheDocument()
    const paginationNextText = screen.getByText("Next")
    expect(paginationNextText).toBeInTheDocument()

    const paginationPagesItems = screen.getAllByRole("listitem")
    expect(paginationPagesItems).toHaveLength(5)
    expect(paginationPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[1]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[2]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPagesItems[3]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[4]).toHaveClass("govuk-pagination__item")

    const page4Link = screen.getByText("4")
    expect(page4Link).toBeInTheDocument()
    await userEvent.click(page4Link)

    const paginationPostClickPagesItems = screen.getAllByRole("listitem")
    expect(paginationPostClickPagesItems).toHaveLength(5)
    expect(paginationPostClickPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPostClickPagesItems[1]).toHaveClass("govuk-pagination__item")
    expect(paginationPostClickPagesItems[2]).toHaveClass("govuk-pagination__item")
    expect(paginationPostClickPagesItems[3]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPostClickPagesItems[4]).toHaveClass("govuk-pagination__item")

    expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it("standard mid point pagination previous click functions correctly", async () => {
    render(
      <Pagination
        pageNumbers={5}
        currentPage={3}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )

    const paginationPreviousText = screen.getByText("Previous")
    expect(paginationPreviousText).toBeInTheDocument()

    const paginationPagesItems = screen.getAllByRole("listitem")
    expect(paginationPagesItems).toHaveLength(5)
    expect(paginationPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[1]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[2]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPagesItems[3]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[4]).toHaveClass("govuk-pagination__item")

    await userEvent.click(paginationPreviousText)

    const paginationPostClickPagesItems = screen.getAllByRole("listitem")
    expect(paginationPostClickPagesItems).toHaveLength(5)
    expect(paginationPostClickPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPostClickPagesItems[1]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPostClickPagesItems[2]).toHaveClass("govuk-pagination__item")
    expect(paginationPostClickPagesItems[3]).toHaveClass("govuk-pagination__item")
    expect(paginationPostClickPagesItems[4]).toHaveClass("govuk-pagination__item")

    expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it("standard page 2 of 5 pagination previous click removes previous button correctly", async () => {
    render(
      <Pagination
        pageNumbers={5}
        currentPage={2}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )

    const paginationPreviousText = screen.getByText("Previous")
    expect(paginationPreviousText).toBeInTheDocument()

    const paginationPagesItems = screen.getAllByRole("listitem")
    expect(paginationPagesItems).toHaveLength(5)
    expect(paginationPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[1]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPagesItems[2]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[3]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[4]).toHaveClass("govuk-pagination__item")

    await userEvent.click(paginationPreviousText)

    const paginationPostPagesItems = screen.getAllByRole("listitem")
    expect(paginationPostPagesItems).toHaveLength(5)
    expect(paginationPostPagesItems[0]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPostPagesItems[1]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[2]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[3]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[4]).toHaveClass("govuk-pagination__item")

    expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    expect(mockOnPageChange).toHaveBeenCalledWith(1)
    expect(paginationPreviousText).not.toBeVisible()
  })

  it("standard mid point pagination next click functions correctly", async () => {
    render(
      <Pagination
        pageNumbers={5}
        currentPage={3}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )

    const paginationNextText = screen.getByText("Next")
    expect(paginationNextText).toBeInTheDocument()

    const paginationPagesItems = screen.getAllByRole("listitem")
    expect(paginationPagesItems).toHaveLength(5)
    expect(paginationPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[1]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[2]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPagesItems[3]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[4]).toHaveClass("govuk-pagination__item")

    await userEvent.click(paginationNextText)

    const paginationPostPagesItems = screen.getAllByRole("listitem")
    expect(paginationPostPagesItems).toHaveLength(5)
    expect(paginationPostPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[1]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[2]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[3]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPostPagesItems[4]).toHaveClass("govuk-pagination__item")

    expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it("standard page 4 of 5 pagination next click removes next button correctly", async () => {
    render(
      <Pagination
        pageNumbers={5}
        currentPage={4}
        label="results 1"
        onPageChange={mockOnPageChange}
      />
    )

    const paginationPreviousText = screen.getByText("Previous")
    expect(paginationPreviousText).toBeInTheDocument()
    const paginationNextText = screen.getByText("Next")
    expect(paginationNextText).toBeInTheDocument()

    const paginationPagesItems = screen.getAllByRole("listitem")
    expect(paginationPagesItems).toHaveLength(5)
    expect(paginationPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[1]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[2]).toHaveClass("govuk-pagination__item")
    expect(paginationPagesItems[3]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )
    expect(paginationPagesItems[4]).toHaveClass("govuk-pagination__item")

    await userEvent.click(paginationNextText)

    const paginationPostPagesItems = screen.getAllByRole("listitem")
    expect(paginationPostPagesItems).toHaveLength(5)
    expect(paginationPostPagesItems[0]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[1]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[2]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[3]).toHaveClass("govuk-pagination__item")
    expect(paginationPostPagesItems[4]).toHaveClass(
      "govuk-pagination__item govuk-pagination__item--current"
    )

    expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    expect(mockOnPageChange).toHaveBeenCalledWith(5)
    expect(paginationNextText).not.toBeVisible()
  })
})
