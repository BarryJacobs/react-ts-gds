import { describe, expect, it, vi } from "vitest"
import { render, screen, configureAxeForReactComponents, extendExpectForAxe } from "utils/test"
import { HttpResponse, http } from "msw"
import { setupServer } from "msw/node"
import { Users } from "./Users"
import { User } from "interfaces"

import mockUserData from "data/mocks/users/data.json"

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useLoaderData: () => mockUserData
}))

extendExpectForAxe()

describe("Users", () => {
  const server = setupServer(
    http.get(`${import.meta.env.VITE_API_BASE_URL}/users`, () => {
      return HttpResponse.json(mockUserData, { status: 200 })
    })
  )

  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => server.resetHandlers())

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
