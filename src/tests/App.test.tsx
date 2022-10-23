import { describe, expect, it } from "vitest"
import { render, screen, extendExpectForAxe, configureAxeForReactComponents } from "utils/testUtils"
import App from "../App"

extendExpectForAxe()

describe("App", () => {
  it("must be accessible", async () => {
    const { container } = render(<App />)
    const axe = configureAxeForReactComponents()
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})
