import React, { memo, useEffect, useMemo, useState } from "react"

import { v4 as uuidv4 } from "uuid"

export interface TabContent {
  title: string
  children: any
  selected?: boolean
}

export interface TabProps {
  heading: string
  tabs: TabContent[]
}

const Tabs = ({ heading, tabs }: TabProps) => {
  const [tabBlocks, setTabBlocks] = useState<TabContent[]>(tabs)
  const [renderToggle, setRenderToggle] = useState(false)
  useMemo(() => {}, [])

  const normaliseTabTitles = (title: string): string => {
    return title.replace(" ", "-")
  }

  const setActive = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    e.preventDefault()
    const tabBuilder: TabContent[] = tabBlocks
    tabBuilder.forEach(tab => {
      tab.selected = false
    })
    tabBuilder[index].selected = true
    setTabBlocks(tabBuilder)
    setRenderToggle(!renderToggle)
    return false
  }

  useEffect(() => {
    if (tabBlocks.filter(x => x.selected).length === 0) {
      const tabBuilder: TabContent[] = tabBlocks
      tabBuilder[0].selected = true
      setTabBlocks(tabBuilder)
      setRenderToggle(!renderToggle)
    }
  }, [renderToggle, tabBlocks])

  return (
    <div className="govuk-tabs" data-module="govuk-tabs">
      <h2 className="govuk-tabs__title">{heading}</h2>
      <ul className="govuk-tabs__list">
        {tabBlocks.map((tab, index) => {
          const normalisedHeader = normaliseTabTitles(tab.title)
          const tabHeaderAttr = {
            className: tab.selected
              ? "govuk-tabs__list-item govuk-tabs__list-item--selected"
              : "govuk-tabs__list-item"
          }
          return (
            <li {...tabHeaderAttr} key={uuidv4()}>
              <a
                className="govuk-tabs__tab"
                href={`#${normalisedHeader}`}
                onClick={e => setActive(e, index)}>
                {tab.title}
              </a>
            </li>
          )
        })}
      </ul>
      {tabBlocks.map((tab, index) => {
        const normalisedHeader = normaliseTabTitles(tab.title)
        const tabAttr = {
          className: tab.selected
            ? "govuk-tabs__panel"
            : "govuk-tabs__panel govuk-tabs__panel--hidden"
        }
        return (
          <div {...tabAttr} id={normalisedHeader} key={`${normalisedHeader}-tab-${index}`}>
            {tab.children}
          </div>
        )
      })}
    </div>
  )
}

export default memo(Tabs)
