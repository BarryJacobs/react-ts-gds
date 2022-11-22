import { ReactNode, useState, useEffect, useCallback } from "react"
import AccordionSection from "./AccordionSection"

import "styles/accordion-v1.scss"

interface AccordionProps<T> {
  renderHeader: (item: T) => ReactNode
  renderSummary: (item: T) => ReactNode
  renderContent: (item: T) => ReactNode
  data: T[]
}

export const Accordion = <T,>({
  data,
  renderHeader,
  renderSummary,
  renderContent
}: AccordionProps<T>) => {
  const [openAllSections, setOpenAllSections] = useState<boolean | undefined>(undefined)
  const [showOpenAll, setShowOpenAll] = useState(true)
  const [sectionStates, setSectionStates] = useState<boolean[]>(new Array(data.length).fill(false))

  const onClickHandler = () => {
    const newShowOpenAll = !showOpenAll
    setShowOpenAll(newShowOpenAll)
    setOpenAllSections(!newShowOpenAll)
  }

  const onSectionChangedHandler = useCallback((section: number, newState: boolean) => {
    setSectionStates(prevState =>
      prevState.map((item, index) => (index === section ? newState : item))
    )
  }, [])

  useEffect(() => {
    if (sectionStates.every(item => item === true)) {
      setShowOpenAll(false)
      setOpenAllSections(undefined)
    } else if (sectionStates.includes(false)) {
      setShowOpenAll(true)
      setOpenAllSections(undefined)
    }
  }, [sectionStates])

  return (
    <div className="govuk-accordion-v1">
      <div className="govuk-accordion__controls">
        <button
          className="govuk-accordion__open-all"
          aria-label="toggle-accordion"
          onClick={() => onClickHandler()}>
          <span>{showOpenAll ? "Open all" : "Close all"}</span>
        </button>
      </div>
      {data.map((item: T, index: number) => (
        <AccordionSection
          key={index}
          section={index}
          isOpenAll={openAllSections}
          onSectionStateChanged={onSectionChangedHandler}>
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <button className="govuk-accordion__section-button">
                <span>{renderHeader(item)}</span>
                <span className="govuk-accordion__icon" aria-hidden="true" />
              </button>
            </h2>
            <div className="govuk-accordion__section-summary govuk-body">{renderSummary(item)}</div>
            <div className="govuk-accordion__section-content govuk-body">{renderContent(item)}</div>
          </div>
        </AccordionSection>
      ))}
    </div>
  )
}
