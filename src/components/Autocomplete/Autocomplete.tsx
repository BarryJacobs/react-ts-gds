import { useState } from "react"
import Select, {
  components,
  DropdownIndicatorProps,
  NoticeProps,
  GroupBase,
  PropsValue,
  SingleValue,
  CSSObjectWithLabel
} from "react-select"
import CreateableSelect from "react-select/creatable"

import "styles/autocomplete.scss"

const DropdownArrow = () => {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 21 21"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false">
      <g stroke="none" fill="none" fillRule="evenodd">
        <polygon fill="#000000" points="0 2 22 2 11 19" />
      </g>
    </svg>
  )
}

interface AutoCompleteProps<T extends { label: string; value: string }> {
  identifier: string
  label: string
  hint?: string
  error?: string
  isLoading?: boolean
  isDisabled?: boolean
  placeholder?: string
  required?: boolean
  allowCreate?: boolean
  useUpperCase?: boolean
  containerClassExt?: string
  labelClassExt?: string
  options: T[]
  value: PropsValue<T> | undefined
  getOptionLabel: (value: T) => string
  onChange: (value: SingleValue<T>) => void
}

export const AutoComplete = <T extends { label: string; value: string }>({
  identifier,
  label,
  hint,
  error,
  placeholder = "",
  required = false,
  containerClassExt = "",
  labelClassExt = "",
  options,
  value,
  isLoading = false,
  isDisabled = false,
  allowCreate = false,
  useUpperCase = false,
  getOptionLabel,
  onChange
}: AutoCompleteProps<T>) => {
  const [controlOptions, setControlOptions] = useState(options)
  const [controlValue, setControlValue] = useState(value)

  const containerAttr = {
    className: error
      ? `govuk-form-group govuk-form-group-error ${containerClassExt}`
      : `govuk-form-group ${containerClassExt}`
  }

  const labelAttr = {
    className: `govuk-label ${labelClassExt}`,
    id: `${identifier}-label`
  }

  const customStyles = {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      borderColor: error ? "#d4351c !important" : "#0b0c0c"
    })
  }

  const NoOptionsMessage = (props: NoticeProps<T, boolean, GroupBase<T>>) => {
    return (
      <components.NoOptionsMessage {...props}>
        <div className="gds-autocomplete__no-options">No results found</div>
      </components.NoOptionsMessage>
    )
  }

  const DropdownIndicator = (props: DropdownIndicatorProps<T, boolean, GroupBase<T>>) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropdownArrow />
      </components.DropdownIndicator>
    )
  }

  const changeHandler = (selectedValue: SingleValue<T>) => {
    onChange(selectedValue)
    setControlValue(selectedValue)
    const inputElement = document.querySelector<HTMLInputElement>(`#${identifier}`)
    if (inputElement) {
      inputElement.blur()
      inputElement.focus()
    }
  }

  const createOptionHandler = (label: string) => {
    const newValue = useUpperCase ? label.toUpperCase() : label
    const newOption: any = {
      label: newValue,
      value: newValue
    }
    setControlOptions(prev => [...prev, newOption])
    setControlValue(newOption)
    onChange(newOption)
  }

  const formatLabelHandler = (label: string) =>
    `Select "${useUpperCase ? label.toUpperCase() : label}"`

  const selectProps = {
    name: identifier,
    required,
    inputId: identifier,
    "aria-invalid": error !== undefined,
    "aria-labelledby": labelAttr.id,
    className: "gds-autocomplete",
    classNamePrefix: "gds-autocomplete",
    styles: customStyles,
    components: {
      DropdownIndicator,
      NoOptionsMessage
    },
    isSearchable: true,
    placeholder,
    options: controlOptions,
    value: controlValue,
    getOptionLabel,
    onChange: changeHandler,
    isDisabled,
    isLoading
  }

  return (
    <div {...containerAttr}>
      <label htmlFor={identifier} {...labelAttr}>
        {label}
      </label>

      {hint && (
        <div id={`${identifier}-hint`} className="govuk-hint">
          {hint}
        </div>
      )}

      {error && (
        <p id={`${identifier}-error`} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span>
          {error}
        </p>
      )}

      {allowCreate ? (
        <CreateableSelect
          isMulti={false}
          onCreateOption={createOptionHandler}
          formatCreateLabel={formatLabelHandler}
          {...selectProps}
        />
      ) : (
        <Select isMulti={false} {...selectProps} />
      )}
    </div>
  )
}
