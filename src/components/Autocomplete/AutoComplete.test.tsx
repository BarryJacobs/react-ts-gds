import { describe, expect, it, vi } from "vitest"
import {
  render,
  screen,
  configureAxeForReactComponents,
  extendExpectForAxe,
  userEvent,
  waitFor,
  act
} from "utils/test"
import { AutoComplete } from "components"

extendExpectForAxe()

Object.defineProperty(Element.prototype, "getBoundingClientRect", {
  configurable: true,
  value: jest.fn(() => {
    return {
      width: 120,
      height: 120,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    }
  })
})

const mockOnChange = vi.fn()

const cars = [
  { label: "BMW", value: "01" },
  { label: "Ferrari", value: "02" },
  { label: "Toyota", value: "03" }
]

describe("AutoComplete", () => {
  afterEach(() => vi.restoreAllMocks())

  it("must not fail any accessibility tests by default", async () => {
    const { container } = render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
      />
    )

    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("must not fail any accessibility tests with all options configured", async () => {
    const { container } = render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        labelClassExt="govuk-label--s"
        containerClassExt="govuk-input--width-20"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
        error={"error"}
        hint={"hint"}
        placeholder={"placeholder"}
        isDisabled={false}
        isLoading={false}
      />
    )

    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("must not fail any accessibility tests when loading and disabled", async () => {
    const { container } = render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        labelClassExt="govuk-label--s"
        containerClassExt="govuk-input--width-20"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
        error={"error"}
        hint={"hint"}
        placeholder={"placeholder"}
        isDisabled={true}
        isLoading={true}
      />
    )

    const axe = configureAxeForReactComponents()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("must display options correctly", async () => {
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
      />
    )

    await act(async () => {
      await userEvent.click(screen.getByLabelText("Cars"))
    })

    await waitFor(() => {
      cars.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument()
      })
    })
  })

  it("must render correctly by default", async () => {
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
      />
    )

    const select = await screen.findByRole("combobox")
    expect(select).toBeInTheDocument()
    expect(select).toHaveClass("gds-autocomplete__input")
    expect(select).toHaveAttribute("id", "cars")
    expect(select).toHaveAttribute("aria-invalid", "false")
  })

  it("must call onChange when an option is selected", async () => {
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        allowCreate={true}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
      />
    )

    const autoComplete = screen.getByLabelText("Cars")
    await act(async () => {
      await userEvent.click(autoComplete)
    })

    await act(async () => {
      await userEvent.type(autoComplete, "{enter}")
    })

    expect(mockOnChange.mock.calls.length).toEqual(2)
    expect(mockOnChange.mock.calls[0]).toEqual([null])
    expect(mockOnChange.mock.calls[1]).toEqual([
      {
        label: "BMW",
        value: "01"
      }
    ])
  })

  it("must render creatable select correctly by default", async () => {
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        allowCreate={true}
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
      />
    )

    const select = await screen.findByRole("combobox")
    expect(select).toBeInTheDocument()
    expect(select).toHaveClass("gds-autocomplete__input")
    expect(select).toHaveAttribute("id", "cars")
    expect(select).toHaveAttribute("aria-invalid", "false")
  })

  it("must render correctly when error is provided", async () => {
    const errorText = "This is an error"
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
        error={errorText}
      />
    )

    const select = await screen.findByRole("combobox")
    expect(select).toBeInTheDocument()
    expect(select).toHaveAttribute("aria-invalid", "true")

    const error = await screen.findByText(errorText)
    expect(error).toBeInTheDocument()
    expect(error).toHaveClass("govuk-error-message")
    expect(error).toHaveAttribute("id", "cars-error")
  })

  it("must render correctly when hint is provided", async () => {
    const hintText = "This is a hint"
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
        hint={hintText}
      />
    )

    const error = await screen.findByText(hintText)
    expect(error).toBeInTheDocument()
    expect(error).toHaveClass("govuk-hint")
    expect(error).toHaveAttribute("id", "cars-hint")
  })

  it("must apply labelClassExt to label element", async () => {
    const labelClassExt = "custom-label"
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
        labelClassExt={labelClassExt}
      />
    )

    const label = screen.getByText("Cars").closest("label")
    expect(label).toHaveClass(labelClassExt)
  })

  it("must apply containerClassExt to label element", async () => {
    const containerClassExt = "custom-container"
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
        containerClassExt={containerClassExt}
      />
    )

    const label = screen.getByText("Cars").closest(".govuk-form-group")
    expect(label).toHaveClass("govuk-form-group", containerClassExt)
  })

  it("must display no results found when no options match", async () => {
    render(
      <AutoComplete
        identifier="cars"
        label="Cars"
        options={cars}
        value={null}
        getOptionLabel={x => x.label}
        onChange={mockOnChange}
      />
    )

    const autoComplete = screen.getByLabelText("Cars")
    await act(async () => {
      await userEvent.type(autoComplete, "No option here")
    })

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument()
    })
  })
})
