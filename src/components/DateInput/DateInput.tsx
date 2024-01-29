import { useState } from "react"
import { DatePicker } from "react-date-picker"

import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import "./DateInput.scss"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface DateInputProps {
  identifier: string
}

export const DateInput = ({ identifier }: DateInputProps) => {
  const [startDate, setStartDate] = useState<Value>(null)

  const containerAttr = {
    className: "govuk-form-group"
  }

  return (
    <div {...containerAttr}>
      <DatePicker
        id={identifier}
        value={startDate}
        onChange={date => {
          console.log("Date change: ", date)
          setStartDate(date)
        }}
        locale="en-GB"
        monthPlaceholder="mm"
        dayPlaceholder="dd"
        yearPlaceholder="yyyy"
        showLeadingZeros={true}
        openCalendarOnFocus={false}
        calendarAriaLabel="Toggle calendar"
        clearAriaLabel="Clear value"
        className="barry-test"
      />
    </div>
  )
}
