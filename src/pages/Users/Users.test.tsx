import { describe, expect, it } from "vitest"
import { render, extendExpectForAxe, configureAxeForReactComponents } from "utils/testUtils"
import Users from "./Users"

extendExpectForAxe()

describe("Users", () => {
  it("must be accessible", async () => {
    const { container } = render(<Users />)
    const axe = configureAxeForReactComponents()
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})
