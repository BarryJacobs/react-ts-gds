import { useState, useRef, useCallback } from "react"
import { AccordionOptions, Accordion, Section } from "../types"
import produce from "immer"

interface AccordionState<T> {
  showOpenAll: boolean
  sections: Section<T>[]
}

export const useAccordion = <T>(options: AccordionOptions<T>): Accordion<T> => {
  const accordionRef = useRef({})

  const { data, definition } = options
  const [state, setState] = useState<AccordionState<T>>({
    showOpenAll: true,
    sections: data.map<Section<T>>((item, index) => {
      return {
        id: index,
        definition,
        isExpanded: false,
        getValue: () => item
      }
    })
  })

  const getSections = useCallback(() => state.sections, [state.sections])
  const getShowOpenAll = useCallback(() => state.showOpenAll, [state.showOpenAll])

  const toggleAllExpanded = useCallback(() => {
    setState(
      produce(draft => {
        draft.sections.forEach(section => (section.isExpanded = draft.showOpenAll))
        draft.showOpenAll = !draft.showOpenAll
      })
    )
  }, [])

  const toggleSectionExpanded = useCallback((index: number) => {
    setState(
      produce(draft => {
        const section = draft.sections[index]
        section.isExpanded = !section.isExpanded
      })
    )
  }, [])

  accordionRef.current = {
    ...accordionRef.current,
    options,
    getSections,
    getShowOpenAll,
    toggleSectionExpanded,
    toggleAllExpanded
  }

  return accordionRef.current as unknown as Accordion<T>
}
