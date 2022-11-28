import { ReactElement } from "react"
import { SectionDefinition, flexRender } from "./types"
import { useAccordion } from "./hooks/useAccordion"

interface AccordionV2Props<T> {
  definition: SectionDefinition<T>
  data: T[]
}

export const AccordionV2 = <T,>({ definition, data }: AccordionV2Props<T>): ReactElement => {
  const accordion = useAccordion({
    definition,
    data
  })

  const showOpenAll = accordion.getShowOpenAll()
  const hasSummary = accordion.options.definition.summary !== undefined
  const accordionType = hasSummary ? "with-summary-sections" : "default"

  return (
    <div
      className="govuk-accordion"
      data-module="govuk-accordion"
      id={`accordion-${accordionType}`}>
      <div className="govuk-accordion__controls">
        <button
          type="button"
          className="govuk-accordion__show-all"
          aria-expanded={!showOpenAll}
          onClick={() => accordion.toggleAllExpanded()}>
          <span
            className={`govuk-accordion-nav__chevron${
              showOpenAll ? " govuk-accordion-nav__chevron--down" : ""
            }`}></span>
          <span className="govuk-accordion__show-all-text">
            {showOpenAll ? "Show all sections" : "Hide all sections"}
          </span>
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
                  aria-controls={`accordion-${accordionType}-content-${section.id}`}
                  className="govuk-accordion__section-button"
                  aria-expanded={section.isExpanded}
                  aria-label={`${section.definition.descriptiveText(section.getValue())} , ${
                    section.isExpanded ? "Hide" : "Show"
                  } this section`}>
                  <span
                    className="govuk-accordion__section-heading-text"
                    id={`accordion-${accordionType}-heading-${section.id}`}>
                    <span className="govuk-accordion__section-heading-text-focus">
                      {flexRender(section.definition.header, section)}
                    </span>
                  </span>
                  {hasSummary && (
                    <>
                      <span className="govuk-visually-hidden govuk-accordion__section-heading-divider">
                        ,{" "}
                      </span>
                      <span
                        className="govuk-accordion__section-summary govuk-body"
                        id={`accordion-with-summary-sections-summary-${section.id}`}>
                        <span className="govuk-accordion__section-summary-focus">
                          {flexRender(section.definition.summary, section)}
                        </span>
                      </span>
                    </>
                  )}
                  <span className="govuk-visually-hidden govuk-accordion__section-heading-divider">
                    ,{" "}
                  </span>
                  <span className="govuk-accordion__section-toggle" data-nosnippet>
                    <span className="govuk-accordion__section-toggle-focus">
                      <span
                        className={`govuk-accordion-nav__chevron${
                          !section.isExpanded ? " govuk-accordion-nav__chevron--down" : ""
                        }`}></span>
                      <span className="govuk-accordion__section-toggle-text">
                        {section.isExpanded ? "Hide" : "Show"}
                      </span>
                    </span>
                  </span>
                </button>
              </h2>
            </div>
            <div
              id={`accordion-${accordionType}-content-${section.id}`}
              className="govuk-accordion__section-content"
              aria-labelledby={`accordion-${accordionType}-heading-${section.id}`}>
              {flexRender(section.definition.content, section)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
