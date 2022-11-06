import type { Meta, StoryObj } from "@storybook/react"
import { withRouter } from "storybook-addon-react-router-v6"
import { Table } from "components"
import { GDSSize } from "types"
import { DateAndAmount } from "./interfaces"

import "styles/site.scss"

const meta: Meta<typeof Table<DateAndAmount>> = {
  title: "GDS/Table/DatesAndAmounts",
  component: Table,
  decorators: [withRouter],
  parameters: {
    layout: "padded"
  }
}

export default meta
type Story = StoryObj<typeof Table<DateAndAmount>>

export const DatesAndAmounts: Story = {
  args: {
    data: [
      {
        date: "First 6 weeks",
        amount: "£109.80 per week"
      },
      {
        date: "Next 33 weeks",
        amount: "£109.80 per week"
      },
      {
        date: "Total estimated pay",
        amount: "£4,282.20"
      }
    ],
    columns: [
      {
        header: "Date",
        accessorFn: row => row.date,
        meta: {
          useRowHeader: true
        }
      },
      {
        header: "Amount",
        accessorFn: row => row.amount
      }
    ],
    caption: "Dates and amounts",
    captionSize: GDSSize.medium,
    disableSorting: true
  }
}
