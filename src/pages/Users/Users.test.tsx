import { describe, expect, it, vi } from "vitest"
import { render, screen, configureAxeForReactComponents, extendExpectForAxe } from "utils/test"
import { createServer, Server } from "miragejs"
import { Users } from "./Users"

import mockUserData from "data/mocks/users/data.json"
import { User } from "interfaces"

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useLoaderData: () => mockUserData
}))

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
    expect(results).toHaveNoViolations()
  })

  it("renders correctly", async () => {
    render(<Users />)
    mockUserData.forEach((user: User) => {
      expect(screen.getByText(user.username)).toBeInTheDocument()
      expect(screen.getByText(user.email)).toBeInTheDocument()
      expect(screen.getByText(user.phone)).toBeInTheDocument()
    })
  })
})
