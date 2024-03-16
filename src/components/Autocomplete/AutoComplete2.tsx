import { useState, useEffect, useMemo, useRef, ChangeEvent, KeyboardEvent } from "react"
import { Option } from "types"

import "./AutoComplete2.scss"

interface AutoComplete2Props {
  identifier: string
  label: string
  hint?: string
  error?: string
  isDisabled?: boolean
  placeholder?: string
  required?: boolean
  allowCreate?: boolean
  useUpperCase?: boolean
  containerClassExt?: string
  labelClassExt?: string
  inputClassExt?: string
  options: Option[]
  value: Option | undefined
  onChange: (value: Option) => void
}

const NewOptionMatch = /^Select ".*"$/

export const AutoComplete2 = ({
  identifier,
  label,
  hint,
  error,
  placeholder = "",
  required = false,
  containerClassExt = "",
  labelClassExt = "",
  inputClassExt = "",
  options,
  // value,
  isDisabled = false,
  allowCreate = false,
  useUpperCase = false,
  onChange
}: AutoComplete2Props) => {
  const [focusIndex, setFocusIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [listItems, setListItems] = useState<Option[]>(options)
  const [filteredItems, setFilteredItems] = useState<Option[]>([])
  const [isMouseOverDropdown, setIsMouseOverDropdown] = useState(false)
  const [isItemSelected, setIsItemSelected] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const containerAttr = {
    className: error
      ? `gds-auto-complete govuk-form-group govuk-form-group-error ${containerClassExt}`
      : `gds-auto-complete govuk-form-group ${containerClassExt}`
  }

  const labelAttr = {
    className: `govuk-label ${labelClassExt}`,
    id: `${identifier}-label`
  }

  const inputAttr = useMemo(() => {
    const inputProps = {
      id: identifier,
      name: identifier,
      type: "text",
      role: "combobox",
      className: `govuk-input gds-autocomplete__input ${inputClassExt}`,
      autoCapitalize: useUpperCase ? "on" : "none",
      autoComplete: "off",
      spellCheck: false,
      placeholder,
      disabled: isDisabled,
      required,
      "aria-required": required,
      "aria-disabled": isDisabled,
      "aria-describedby": "",
      "aria-invalid": false,
      "aria-expanded": showDropdown
    }

    if (error) {
      inputProps["aria-describedby"] += `${identifier}-error `
      inputProps.className += " govuk-input--error"
      inputProps["aria-invalid"] = true
    }
    if (hint) {
      inputProps["aria-describedby"] += `${identifier}-hint `
    }
    inputProps["aria-describedby"] += `${identifier}-label`

    return inputProps
  }, [identifier, required, useUpperCase, isDisabled])

  const focusInput = () =>
    setTimeout(() => {
      inputRef.current?.focus()
    }, 10)

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev)
    if (!showDropdown) {
      focusInput()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(useUpperCase ? e.target.value.toUpperCase() : e.target.value)
    setShowDropdown(true)
  }

  const handleSelect = (option: Option) => {
    if (allowCreate && NewOptionMatch.test(option.label)) {
      option = { label: option.value, value: option.value }
      setListItems(prev => [option, ...prev])
      setFilteredItems(prev => [option, ...prev.slice(0, -1)])
    }
    setSelectedOption(option)
    setSearchTerm(option.label)
    setIsItemSelected(true)
    setShowDropdown(false)
    onChange(option)
    focusInput()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        if (showDropdown) {
          e.preventDefault()
          setFocusIndex(prevIndex => Math.min(prevIndex + 1, filteredItems.length - 1))
        } else {
          setShowDropdown(true)
        }
        break
      case "ArrowUp":
        if (showDropdown) {
          e.preventDefault()
          setFocusIndex(prevIndex => Math.max(prevIndex - 1, 0))
        } else {
          setShowDropdown(true)
        }
        break
      case "Tab":
      case "Enter":
        if (showDropdown) {
          e.preventDefault()
          if (filteredItems.length) {
            handleSelect(filteredItems[focusIndex])
          }
        }
        break
      case "Escape":
        setShowDropdown(false)
        break
      default:
    }
  }

  const handleFocus = () => {
    if (!isItemSelected) {
      inputRef.current?.select()
      setShowDropdown(true)
    } else {
      setIsItemSelected(false)
    }
  }

  const handleBlur = () => {
    if (selectedOption && searchTerm !== selectedOption.label) {
      setSearchTerm(selectedOption.label)
    }
    if (!isMouseOverDropdown) {
      setShowDropdown(false)
    }
  }

  const updateFilteredItems = (options: Option[]) => {
    if (allowCreate && searchTerm && options.findIndex(x => x.label === searchTerm) === -1) {
      const newOption: Option = {
        label: `Select "${searchTerm}"`,
        value: searchTerm
      }
      if (options.length === 0 || !NewOptionMatch.test(options[options.length - 1].label)) {
        options = [...options, newOption]
      } else {
        options[options.length - 1] = newOption
      }
    }
    setFilteredItems(options)
  }

  useEffect(() => {
    if (showDropdown) {
      if (listRef.current) {
        const listItem = listRef.current.children[focusIndex] as HTMLElement
        listItem?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    } else {
      setFocusIndex(0)
    }
  }, [focusIndex, showDropdown])

  useEffect(() => {
    if (searchTerm === "") {
      updateFilteredItems([...listItems])
    } else {
      const currentFocusItem = filteredItems[focusIndex]
      const filtered = listItems.filter(x =>
        x.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      const newFocusIndex = filtered.findIndex(x => x.label === currentFocusItem?.label)
      setFocusIndex(Math.max(newFocusIndex, 0))
      updateFilteredItems(filtered)
    }
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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

      <div className="gds-autocomplete__input-wrapper">
        <input
          {...inputAttr}
          ref={inputRef}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <svg
          className="gds-autocomplete__dropdown-indicator"
          height="20"
          width="20"
          viewBox="0 0 21 21"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          onMouseDown={toggleDropdown}>
          <g stroke="none" fill="none" fillRule="evenodd">
            <polygon fill="#000000" points="0 2 22 2 11 19" />
          </g>
        </svg>
      </div>

      {showDropdown && (
        <div className="gds-autocomplete__menu">
          <ul
            ref={listRef}
            role="listbox"
            aria-labelledby={`${identifier}-label`}
            aria-multiselectable={false}
            className="gds-autocomplete__menu-list"
            onMouseEnter={() => setIsMouseOverDropdown(true)}
            onMouseLeave={() => setIsMouseOverDropdown(false)}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={`gds-autocomplete__option-${index}`}
                  role="option"
                  aria-selected={false}
                  className={`gds-autocomplete__option ${
                    index === focusIndex ? " gds-autocomplete__option--is-focused" : ""
                  }`}
                  onClick={() => handleSelect(item)}>
                  {item.label}
                </li>
              ))
            ) : (
              <li key="no-results" className="gds-autocomplete__option">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
