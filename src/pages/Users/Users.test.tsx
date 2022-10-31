import { describe, expect, it } from "vitest"
import { render, screen, extendExpectForAxe, configureAxeForReactComponents } from "utils/test"
import { createServer, Server } from "miragejs"
import { Users } from "./Users"

import mockUserData from "data/mocks/users/data.json"

extendExpectForAxe()

let server: Server

beforeEach(() => {
  server = createServer({
    routes() {
      this.get(`${import.meta.env.VITE_API_BASE_URL}/users`, () => {
        return mockUserData
      })
    }
  })
  server.logging = false
})

afterEach(() => {
  server.shutdown()
})

describe("Users", () => {
  it("must be accessible", async () => {
    const { container } = render(<Users />)
    const axe = configureAxeForReactComponents()
    const results = await axe(container)

    await screen.findByText("Username")
    expect(results).toHaveNoViolations()
  })

  // it("renders user correctly", async () => {
  //   render(<Users />)
  //   mockUserData.forEach((user: User) => {
  //     console.log(user.name)
  //     expect(screen.getByText(user.name)).toBeInTheDocument()
  //   })
  // })
})
