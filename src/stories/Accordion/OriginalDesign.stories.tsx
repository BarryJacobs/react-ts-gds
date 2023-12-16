import type { Meta, StoryObj } from "@storybook/react"
import { AccordionV1 } from "components"
import { Writing, writingData } from "data/writing"
import { AgileProcess, agileProcessData } from "data/agileProcess"

import "styles/site.scss"

const meta: Meta<typeof AccordionV1<AgileProcess>> = {
  title: "GDS/Accordion/OriginalDesign",
  component: AccordionV1,
  decorators: [
    Story => (
      <div className="govuk-template__body js-enabled govuk-frontend-supported">
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: "padded"
  }
}

export default meta

type WritingStory = StoryObj<typeof AccordionV1<Writing>>
type AgileStory = StoryObj<typeof AccordionV1<AgileProcess>>

export const NoSummary: WritingStory = {
  args: {
    data: writingData,
    definition: {
      header: section => section.getValue().subject,
      content: section => <p className="govuk-body">{section.getValue().content}</p>,
      descriptiveText: item => item.subject
    }
  }
}

export const WithSummary: AgileStory = {
  args: {
    data: agileProcessData,
    definition: {
      header: section => section.getValue().title,
      summary: section => section.getValue().summary,
      content: section => {
        return (
          <ul className="govuk-list">
            {section.getValue().items.map((item, index) => {
              return (
                <li key={index}>
                  <a className="govuk-link">{item}</a>
                </li>
              )
            })}
          </ul>
        )
      },
      descriptiveText: process => `${process.title} , ${process.summary}`
    }
  }
}
