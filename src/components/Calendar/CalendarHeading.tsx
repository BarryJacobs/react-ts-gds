interface CalendarHeadingProps {
  text: string
  description: string
}

export const CalendarHeading = ({ text, description }: CalendarHeadingProps) => (
  <th scope="col">
    <span aria-hidden="true">{text}</span>
    <span className="visually-hidden">{description}</span>
  </th>
)
