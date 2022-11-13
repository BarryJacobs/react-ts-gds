import { ReactNode, ReactElement, useState, useEffect } from "react"

interface AccordionSectionProps {
  section: number
  isOpenAll: boolean | undefined
  children: ReactNode
  onSectionStateChanged: (section: number, newState: boolean) => void
}

const sectionClass = "govuk-accordion__section"
const sectionExpandedClass = "govuk-accordion__section govuk-accordion__section--expanded"

const AccordionSection = ({
  section,
  isOpenAll,
  onSectionStateChanged,
  children
}: AccordionSectionProps): ReactElement => {
  const [isOpenSection, setIsOpenSection] = useState(false)

  const onOpenSectionHandler = () => {
    setIsOpenSection(isOpenSection => !isOpenSection)
  }

  useEffect(() => {
    if (isOpenAll !== undefined) {
      setIsOpenSection(isOpenAll)
    }
  }, [isOpenAll])

  useEffect(() => {
    onSectionStateChanged(section, isOpenSection)
  }, [isOpenSection, section, onSectionStateChanged])

  return (
    <div
      data-testid={`section-${section}`}
      className={isOpenSection ? sectionExpandedClass : sectionClass}
      onClick={() => onOpenSectionHandler()}>
      {children}
    </div>
  )
}

export default AccordionSection
