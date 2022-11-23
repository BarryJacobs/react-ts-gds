import { ReactElement, useMemo } from "react"
import { Tabs, Accordion, GDSAccordionV1, GDSAccordionV2 } from "components"
import { SectionDefinition } from "components/Accordion/types"
import { Book, books } from "./data/books"
import { Movie, movies } from "./data/movies"

export const Accordions = (): ReactElement => {
  const accordionDefinitionNoSummary = useMemo<SectionDefinition<Movie>>(() => {
    return {
      header: section => section.getValue().name,
      content: section => section.getValue().synopsis,
      descriptiveText: movie => movie.name
    }
  }, [])

  const accordionDefinitionWithSummary = useMemo<SectionDefinition<Book>>(() => {
    return {
      header: section => section.getValue().title,
      summary: section => section.getValue().author,
      content: section => section.getValue().summary,
      descriptiveText: book => `${book.title} , ${book.author}`
    }
  }, [])

  return (
    <Tabs
      heading="Accordions: Component vs Headless UI"
      tabs={[
        {
          title: "Component",
          children: (
            <Accordion<Book>
              renderHeader={item => item.title}
              renderSummary={item => item.author}
              renderContent={item => item.summary}
              data={books}
            />
          )
        },
        {
          title: "Headless V1",
          children: <GDSAccordionV1 definition={accordionDefinitionNoSummary} data={movies} />
        },
        {
          title: "Headless V1 + Summary",
          children: <GDSAccordionV1 definition={accordionDefinitionWithSummary} data={books} />
        },
        {
          title: "Headless V2",
          children: <GDSAccordionV2 definition={accordionDefinitionNoSummary} data={movies} />
        },
        {
          title: "Headless V2 + Summary",
          children: <GDSAccordionV2 definition={accordionDefinitionWithSummary} data={books} />
        }
      ]}
    />
  )
}
