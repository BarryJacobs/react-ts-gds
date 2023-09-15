import { render, RenderOptions } from "@testing-library/react"
import { ReactElement, ReactNode } from "react"
import { MemoryRouter } from "react-router-dom"
import { configureAxe, toHaveNoViolations } from "jest-axe"
import { QueryClientProvider } from "@tanstack/react-query"
import { generateQueryClient } from "utils/query"
import userEvent from "@testing-library/user-event"

interface RenderProps {
  children?: ReactNode
}

const AllTheProviders = ({ children }: RenderProps) => {
  const queryClient = generateQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, {
    wrapper: args => AllTheProviders({ ...args }),
    ...options
  })

const extendExpectForAxe = () => {
  expect.extend(toHaveNoViolations)
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
export { customRender as render, userEvent, extendExpectForAxe, configureAxeForReactComponents }
