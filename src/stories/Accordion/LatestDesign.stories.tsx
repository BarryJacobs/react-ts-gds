import type { Meta, StoryObj } from "@storybook/react"
import { AccordionV2 } from "components"
import { Writing, writingData } from "data/writing"
import { AgileProcess, agileProcessData } from "data/agileProcess"

import "styles/site.scss"

const meta: Meta<typeof AccordionV2<AgileProcess>> = {
  title: "GDS/Accordion/LatestDesign",
  component: AccordionV2,
  decorators: [
    Story => (
      <div className="js-enabled">
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: "padded"
  }
}

export default meta

type WritingStory = StoryObj<typeof AccordionV2<Writing>>
type AgileStory = StoryObj<typeof AccordionV2<AgileProcess>>

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
