import type { Meta, StoryObj } from "@storybook/react"
import { withRouter } from "storybook-addon-react-router-v6"
import { Table } from "components"
import { GDSSize } from "types"
import { MonthAndRate } from "./interfaces"

import "styles/site.scss"

const meta: Meta<typeof Table<MonthAndRate>> = {
  title: "GDS/Table/MonthsAndRates",
  component: Table,
  decorators: [withRouter],
  parameters: {
    layout: "padded"
  }
}

export default meta
type Story = StoryObj<typeof Table<MonthAndRate>>

export const Numbers: Story = {
  args: {
    data: [
      {
        month: "January",
        bicycleRate: "£85",
        vehicleRate: "£95"
      },
      {
        month: "February",
        bicycleRate: "£75",
        vehicleRate: "£55"
      },
      {
        month: "March",
        bicycleRate: "£165",
        vehicleRate: "£125"
      }
    ],
    columns: [
      {
        header: "Month you apply",
        accessorFn: row => row.month,
        meta: {
          useRowHeader: true
        }
      },
      {
        header: "Rate for bicycles",
        accessorFn: row => row.bicycleRate,
        meta: {
          dataClassExt: "numeric"
        }
      },
      {
        header: "Rate for vehicles",
        accessorFn: row => row.vehicleRate,
        meta: {
          dataClassExt: "numeric"
        }
      }
    ],
    caption: "Months and rates",
    captionSize: GDSSize.medium,
    disableSorting: true
  }
}

export const Widths: Story = {
  args: {
    data: [
      {
        month: "January",
        bicycleRate: "£85",
        vehicleRate: "£95"
      },
      {
        month: "February",
        bicycleRate: "£75",
        vehicleRate: "£55"
      },
      {
        month: "March",
        bicycleRate: "£165",
        vehicleRate: "£125"
      }
    ],
    columns: [
      {
        header: "Month you apply",
        accessorFn: row => row.month,
        meta: {
          useRowHeader: true,
          colClassExt: "govuk-!-width-one-half"
        }
      },
      {
        header: "Rate for bicycles",
        accessorFn: row => row.bicycleRate,
        meta: {
          dataClassExt: "numeric",
          colClassExt: "govuk-!-width-one-quarter"
        }
      },
      {
        header: "Rate for vehicles",
        accessorFn: row => row.vehicleRate,
        meta: {
          dataClassExt: "numeric",
          colClassExt: "govuk-!-width-one-quarter"
        }
      }
    ],
    caption: "Months and rates",
    captionSize: GDSSize.medium,
    disableSorting: true
  }
}
