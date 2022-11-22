// 3.14.0

import { ReactElement } from "react"
import { SectionDefinition, flexRender } from "./types"
import { useAccordion } from "./hooks/useAccordion"

import "styles/accordion-v1.scss"

interface GDSAccordionV1Props<T> {
  definition: SectionDefinition<T>
  data: T[]
}

export const GDSAccordionV1 = <T,>({ definition, data }: GDSAccordionV1Props<T>): ReactElement => {
  const accordion = useAccordion({
    definition,
    data
  })

  return (
    <div className="govuk-accordion-v1">
      <div className="govuk-accordion__controls">
        <button
          className="govuk-accordion__open-all"
          aria-label="toggle-accordion"
          onClick={() => accordion.toggleAllExpanded()}>
          {accordion.getShowOpenAll() ? "Open all" : "Close all"}
        </button>
      </div>
      {accordion.getSections().map(section => {
        return (
          <div
            key={section.id}
            onClick={() => accordion.toggleSectionExpanded(section.id)}
            className={
              section.isExpanded
                ? "govuk-accordion__section govuk-accordion__section--expanded"
                : "govuk-accordion__section"
            }>
            <div className="govuk-accordion__section-header">
              <h2 className="govuk-accordion__section-heading">
                <button
                  type="button"
                  className="govuk-accordion__section-button"
                  aria-expanded={section.isExpanded}>
                  <span>{flexRender(section.definition.header, section)}</span>
                  <span className="govuk-accordion__icon" aria-hidden="true" />
                </button>
              </h2>
              <div className="govuk-accordion__section-summary govuk-body">
                {flexRender(section.definition.summary, section)}
              </div>
              <div className="govuk-accordion__section-content govuk-body">
                {flexRender(section.definition.content, section)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
