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

  const showOpenAll = accordion.getShowOpenAll()
  const hasSummary = accordion.options.definition.summary !== undefined
  const accordionType = hasSummary ? "with-summary-sections" : "default"

  return (
    <div
      className="govuk-accordion-v1"
      data-module="govuk-accordion"
      id={`accordion-${accordionType}`}>
      <div className="govuk-accordion__controls">
        <button
          type="button"
          className="govuk-accordion__open-all"
          aria-expanded={!showOpenAll}
          onClick={() => accordion.toggleAllExpanded()}>
          {showOpenAll ? "Open all" : "Close all"}
          <span className="govuk-visually-hidden"> sections</span>
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
              <h2
                className={`govuk-accordion__section-heading${
                  hasSummary ? "" : " govuk-accordion__section-heading-no-summary"
                }`}>
                <button
                  type="button"
                  id={`accordion-${accordionType}-heading-${section.id}`}
                  className="govuk-accordion__section-button"
                  aria-describedby={
                    hasSummary ? `accordion-with-summary-sections-summary-${section.id}` : ""
                  }
                  aria-expanded={section.isExpanded}>
                  <span>{flexRender(section.definition.header, section)}</span>
                  <span
                    className={`govuk-accordion__icon${
                      hasSummary ? "" : " govuk-accordion__icon-no-summary"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h2>
              {hasSummary && (
                <div
                  className="govuk-accordion__section-summary govuk-body"
                  id={`accordion-with-summary-sections-summary-${section.id}`}>
                  {flexRender(section.definition.summary, section)}
                </div>
              )}
              <div
                className="govuk-accordion__section-content govuk-body"
                id={`accordion-${accordionType}-content-${section.id}`}
                aria-labelledby={`accordion-${accordionType}-heading-${section.id}`}>
                {flexRender(section.definition.content, section)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
