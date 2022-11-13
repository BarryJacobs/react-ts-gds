import { ReactElement } from "react"
import { Accordion } from "components"

interface TestItem {
  header: string
  summary: string
  content: string
}

const testData: TestItem[] = [
  { header: "header one", summary: "summary one", content: "content one" },
  { header: "header two", summary: "summary two", content: "content two" },
  { header: "header three", summary: "summary three", content: "content three" }
]

export const Canvas = (): ReactElement => {
  return (
    <Accordion<TestItem>
      data={testData}
      renderHeader={item => <span>{item.header}</span>}
      renderSummary={item => <span>{item.summary}</span>}
      renderContent={item => <span>{item.content}</span>}
    />
  )
}
