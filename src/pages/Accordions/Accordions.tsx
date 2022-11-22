import { ReactElement, useMemo } from "react"
import { Tabs, Accordion, GDSAccordionV1, GDSAccordionV2 } from "components"
import { SectionDefinition } from "components/Accordion/types"

interface Book {
  title: string
  author: string
  summary: string
}

const books: Book[] = [
  {
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    summary:
      "The story details an incident when Marlow, an Englishman, took a foreign assignment from a Belgian trading company as a ferry-boat captain in Africa."
  },
  {
    title: "The Odyssey",
    author: "Homer",
    summary:
      "The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work traditionally ascribed to Homer."
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    summary:
      "Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families."
  }
]

export const Accordions = (): ReactElement => {
  const gdsDefinition = useMemo<SectionDefinition<Book>>(() => {
    return {
      header: item => item.getValue().title,
      summary: item => item.getValue().author,
      content: item => item.getValue().summary
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
          title: "Headless GDS V1",
          children: <GDSAccordionV1 definition={gdsDefinition} data={books} />
        },
        {
          title: "Headless GDS V2",
          children: <GDSAccordionV2 definition={gdsDefinition} data={books} />
        }
      ]}
    />
  )
}
