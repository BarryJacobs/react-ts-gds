import { describe, expect, it } from "vitest"
import {
  render,
  screen,
  extendExpectForAxe,
  configureAxeForReactComponents,
  userEvent,
  act
} from "utils/test"
import { SectionDefinition } from "components/Accordion/types"
import { Book, books } from "data/books"
import { AccordionV1 } from "components"

extendExpectForAxe()

const accordionDefinitionWithSummary: SectionDefinition<Book> = {
  header: section => section.getValue().title,
  summary: section => section.getValue().author,
  content: section => <p className="govuk-body">{section.getValue().summary}</p>,
  descriptiveText: book => `${book.title} , ${book.author}`
}

describe("Accordion V1", () => {
  it("is accessible when all sections are closed", async () => {
    const { container } = render(
      <AccordionV1 definition={accordionDefinitionWithSummary} data={books} />
    )

    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("is accessible when all sections are open", async () => {
    const { container } = render(
      <AccordionV1 definition={accordionDefinitionWithSummary} data={books} />
    )

    const showAllElement = screen.getByText("Open all")
    expect(showAllElement).toBeInTheDocument()
    await act(async () => {
      await userEvent.click(showAllElement)
    })

    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
