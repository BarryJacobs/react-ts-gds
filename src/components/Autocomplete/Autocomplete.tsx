import Select, {
  components,
  DropdownIndicatorProps,
  NoticeProps,
  GroupBase,
  PropsValue,
  SingleValue,
  CSSObjectWithLabel
} from "react-select"

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

interface AutoCompleteProps<T> {
  identifier: string
  label: string
  hint?: string
  error?: string
  placeholder?: string
  required?: boolean
  containerClassExt?: string
  labelClassExt?: string
  options: T[]
  value: PropsValue<T> | undefined
  getOptionLabel: (value: T) => string
  onChange: (value: SingleValue<T>) => void
}

export const AutoComplete = <T,>({
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
  getOptionLabel,
  onChange
}: AutoCompleteProps<T>) => {
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

  const changeHandler = (value: SingleValue<T>) => {
    onChange(value)
    const inputElement = document.querySelector<HTMLInputElement>(`#${identifier}`)
    if (inputElement) {
      inputElement.blur()
      inputElement.focus()
    }
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

      <Select
        name={identifier}
        required={required}
        inputId={identifier}
        aria-invalid={error !== undefined}
        aria-labelledby={labelAttr.id}
        className="gds-autocomplete"
        classNamePrefix="gds-autocomplete"
        styles={customStyles}
        components={{
          DropdownIndicator,
          NoOptionsMessage
        }}
        isMulti={false}
        isSearchable={true}
        placeholder={placeholder}
        options={options}
        value={value}
        getOptionLabel={getOptionLabel}
        onChange={changeHandler}
      />
    </div>
  )
}
