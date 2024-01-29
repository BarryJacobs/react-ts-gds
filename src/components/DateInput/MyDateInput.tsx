import { format } from "date-fns"

export const MyDateInput: React.FC = () => {
  const currentDate = new Date()

  // Format the current date according to the 'en-GB' locale
  const formattedDate = format(currentDate, "yyyy-MM-dd")

  return (
    <input
      className="govuk-input"
      type="date"
      value={formattedDate}
      // Handle changes if necessary
      onChange={e => console.log(e.target.value)}
    />
  )
}
