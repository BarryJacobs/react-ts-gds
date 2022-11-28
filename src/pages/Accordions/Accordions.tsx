import { ReactElement, useMemo } from "react"
import { Tabs, AccordionV1, AccordionV2 } from "components"
import { SectionDefinition } from "components/Accordion/types"
import { Book, books } from "data/books"
import { Movie, movies } from "data/movies"

export const Accordions = (): ReactElement => {
  const accordionDefinitionNoSummary = useMemo<SectionDefinition<Movie>>(() => {
    return {
      header: section => section.getValue().name,
      content: section => <p className="govuk-body">{section.getValue().synopsis}</p>,
      descriptiveText: movie => movie.name
    }
  }, [])

  const accordionDefinitionWithSummary = useMemo<SectionDefinition<Book>>(() => {
    return {
      header: section => section.getValue().title,
      summary: section => section.getValue().author,
      content: section => <p className="govuk-body">{section.getValue().summary}</p>,
      descriptiveText: book => `${book.title} , ${book.author}`
    }
  }, [])

  return (
    <Tabs
      heading="Headless UI Accordions"
      tabs={[
        {
          title: "Original",
          children: <AccordionV1 definition={accordionDefinitionNoSummary} data={movies} />
        },
        {
          title: "Original + Summary",
          children: <AccordionV1 definition={accordionDefinitionWithSummary} data={books} />
        },
        {
          title: "Latest",
          children: <AccordionV2 definition={accordionDefinitionNoSummary} data={movies} />
        },
        {
          title: "Latest + Summary",
          children: <AccordionV2 definition={accordionDefinitionWithSummary} data={books} />
        }
      ]}
    />
  )
}
