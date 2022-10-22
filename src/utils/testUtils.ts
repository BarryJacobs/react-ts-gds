import { render } from "@testing-library/react"
import { ReactElement } from "react"
import { configureAxe } from "vitest-axe"
import * as matchers from "vitest-axe/matchers"
import userEvent from "@testing-library/user-event"

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => children,
    ...options
  })

const extendExpectForAxe = () => {
  expect.extend(matchers)
}

const configureAxeForReactComponents = () => {
  const axe = configureAxe({
    rules: {
      region: { enabled: false }
    }
  })
  return axe
}

export * from "@testing-library/react"
export { customRender as render, userEvent, configureAxeForReactComponents, extendExpectForAxe }
