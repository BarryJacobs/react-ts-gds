import { describe, expect, it } from "vitest"
import { render, extendExpectForAxe, configureAxeForReactComponents } from "utils/test"
import { Users } from "./Users"

extendExpectForAxe()

describe("Users", () => {
  it("must be accessible", async () => {
    const { container } = render(<Users />)
    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
