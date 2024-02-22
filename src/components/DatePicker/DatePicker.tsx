import { useState, useRef, useEffect, useMemo } from "react"
import { FaRegCalendar } from "react-icons/fa"
import { useIsMobile } from "hooks"
import { InputWidth, InputWidthClass } from "types"
import { format, isValid, parse, parseISO } from "date-fns"
import { enGB } from "date-fns/locale"
import { Value } from "react-calendar/dist/cjs/shared/types"
import Calendar from "react-calendar"

import "react-calendar/dist/Calendar.css"
import "./DatePicker.scss"

enum DatePart {
  None = "",
  Day = "dd",
  Month = "mm",
  Year = "yyyy"
}

interface DatePickerProps {
  identifier: string
  label: string
  value: string
  width?: InputWidth
  multiQuestion?: boolean
  labelClassExt?: string
  inputClassExt?: string
  hint?: string
  disabled?: boolean
  error?: string
  onChange: (value: string) => void
  onBlur: (value: React.FocusEvent<HTMLInputElement>) => void
}

export const DatePicker = ({
  identifier,
  label,
  value,
  width,
  hint,
  multiQuestion,
  labelClassExt,
  inputClassExt,
  disabled,
  error,
  onBlur,
  onChange
}: DatePickerProps) => {
  const [date, setDate] = useState("dd/mm/yyyy")
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [trackInput, setTrackInput] = useState(false)
  const [selectedPart, setSelectedPart] = useState<DatePart>(DatePart.None)
  const [showCalendar, setShowCalendar] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const liveRegionRef = useRef<HTMLSpanElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()

  const inputAttr = useMemo(() => {
    const inputProps = {
      type: "text",
      className: "govuk-input date-input",
      disabled,
      readOnly: isMobile,
      autoComplete: "off",
      spellCheck: false,
      "aria-disabled": disabled,
      "aria-describedby": "",
      "aria-invalid": false
    }

    if (width) {
      inputProps.className += ` ${InputWidthClass[width]}`
    }
    if (inputClassExt) {
      inputProps.className += ` ${inputClassExt}`
    }
    if (error) {
      inputProps["aria-describedby"] = `${identifier}-error `
    }
    if (hint) {
      inputProps["aria-describedby"] += `${identifier}-hint `
    }
    inputProps["aria-describedby"] += `${identifier}-label`

    if (error) {
      inputProps.className += " govuk-input--error"
      inputProps["aria-invalid"] = true
    }

    return inputProps
  }, [hint, disabled, identifier, width, inputClassExt, hint, error])

  const labelAttr = useMemo(() => {
    let assignedClass = "govuk-label govuk-label--l"
    if (labelClassExt) {
      if (multiQuestion) {
        assignedClass = `govuk-label ${labelClassExt}`
      } else {
        assignedClass = `govuk-label govuk-label--l ${labelClassExt}`
      }
    } else if (multiQuestion) {
      assignedClass = "govuk-label"
    }

    return {
      className: assignedClass,
      id: `${identifier}-label`
    }
  }, [labelClassExt, multiQuestion])

  const containerAttr = useMemo(() => {
    return {
      className: error ? "govuk-form-group govuk-form-group--error" : "govuk-form-group"
    }
  }, [error])

  const datePickerContainerAttr = useMemo(() => {
    const datePickerContainerProps = {
      className: "date-picker-container"
    }
    if (width) {
      datePickerContainerProps.className += ` ${InputWidthClass[width]}`
    }
    return datePickerContainerProps
  }, [width])

  const toggleCalendar = () => {
    if (!isMobile) {
      if (!showCalendar) {
        focusInput()
      }
      setShowCalendar(prevShowCalendar => !prevShowCalendar)
    }
  }

  const updateLiveText = (part: DatePart, value: string = "") => {
    if (!isMobile && liveRegionRef.current) {
      if (!value) {
        switch (part) {
          case DatePart.Day:
            liveRegionRef.current.innerText = "Day stepper selected"
            break
          case DatePart.Month:
            liveRegionRef.current.innerText = "Month stepper selected"
            break
          case DatePart.Year:
            liveRegionRef.current.innerText = "Year stepper selected"
            break
          default:
            liveRegionRef.current.innerText = ""
            break
        }
      } else {
        liveRegionRef.current.innerText = value
      }
    }
  }

  const selectDatePart = (part: DatePart) => {
    if (part !== selectedPart) {
      setTrackInput(true)
      updateLiveText(part)
    }
    setSelectedPart(part)
  }

  const focusInput = () => {
    const input = inputRef.current
    if (!input || hasFocus) return
    input.focus()
  }

  const handleArrowLeft = () => {
    if (selectedPart === DatePart.Year) {
      selectDatePart(DatePart.Month)
    } else if (selectedPart === DatePart.Month) {
      selectDatePart(DatePart.Day)
    }
  }

  const handleArrowRight = () => {
    if (selectedPart === DatePart.Day) {
      selectDatePart(DatePart.Month)
    } else if (selectedPart === DatePart.Month) {
      selectDatePart(DatePart.Year)
    }
  }

  const handleTab = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (selectedPart === DatePart.Year) {
      return
    } else if (selectedPart === DatePart.Day) {
      e.preventDefault()
      selectDatePart(DatePart.Month)
    } else if (selectedPart === DatePart.Month) {
      e.preventDefault()
      selectDatePart(DatePart.Year)
    }
  }

  const handleShiftTab = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (selectedPart === DatePart.Day) {
      return
    } else if (selectedPart === DatePart.Month) {
      e.preventDefault()
      selectDatePart(DatePart.Day)
    } else if (selectedPart === DatePart.Year) {
      e.preventDefault()
      selectDatePart(DatePart.Month)
    }
  }

  const handleUpArrow = () => {
    let newDate = date
    let newValue = ""
    switch (selectedPart) {
      case DatePart.Day: {
        const day = parseInt(newDate.substring(0, 2), 10) || 0
        const incrementedDay = (day % 31) + 1
        newValue = incrementedDay.toString().padStart(2, "0")
        newDate = `${newValue}${newDate.substring(2)}`
        break
      }
      case DatePart.Month: {
        const month = parseInt(newDate.substring(3, 5), 10) || 0
        const incrementedMonth = (month % 12) + 1
        newValue = incrementedMonth.toString().padStart(2, "0")
        newDate = `${newDate.substring(0, 3)}${newValue}${newDate.substring(5)}`
        break
      }
      case DatePart.Year: {
        const year = parseInt(newDate.substring(6, 10), 10) || new Date().getFullYear() - 1
        const incrementedYear = year + 1
        newValue = incrementedYear.toString().padStart(4, "0")
        newDate = `${newDate.substring(0, 6)}${newValue}`
        break
      }
      default:
        break
    }
    setDate(newDate)
    updateLiveText(selectedPart, newValue)
  }

  const handleDownArrow = () => {
    let newDate = date
    let newValue = ""
    switch (selectedPart) {
      case DatePart.Day: {
        const day = parseInt(newDate.substring(0, 2), 10) || 1
        const decrementedDay = day === 1 ? 31 : day - 1
        newValue = decrementedDay.toString().padStart(2, "0")
        newDate = `${newValue}${newDate.substring(2)}`
        break
      }
      case DatePart.Month: {
        const month = parseInt(newDate.substring(3, 5), 10) || 1
        const decrementedMonth = month === 1 ? 12 : month - 1
        newValue = decrementedMonth.toString().padStart(2, "0")
        newDate = `${newDate.substring(0, 3)}${newValue}${newDate.substring(5)}`
        break
      }
      case DatePart.Year: {
        const year = parseInt(newDate.substring(6, 10), 10) || new Date().getFullYear() - 1
        const decrementedYear = year - 1
        newValue = decrementedYear.toString().padStart(4, "0")
        newDate = `${newDate.substring(0, 6)}${newValue}`
        break
      }
      default:
        break
    }

    setDate(newDate)
    updateLiveText(selectedPart, newValue)
  }

  const handleNumericKeyPress = (key: string) => {
    let newDate = ""
    let newValue = ""
    let newSelectedPart = selectedPart

    switch (selectedPart) {
      case DatePart.Day: {
        const currentDay = date.substring(0, 2)
        if (!trackInput || (key >= "0" && key <= "3")) {
          if (currentDay === DatePart.Day || trackInput) {
            newValue = `0${key}`
          } else {
            let day = parseInt(`${currentDay.substring(1, 2)}${key}`, 10)
            day = Math.min(Math.max(day, 1), 31)
            newValue = day.toString().padStart(2, "0")
            newSelectedPart = DatePart.Month
          }
          newDate = `${newValue}${date.substring(2)}`
        } else {
          newDate = `0${key}${date.substring(2)}`
          newSelectedPart = DatePart.Month
        }
        break
      }
      case DatePart.Month: {
        const currentMonth = date.substring(3, 5)
        if (key === "0" || key === "1" || (key === "2" && !trackInput)) {
          if (currentMonth === DatePart.Month || trackInput) {
            newValue = `0${key}`
            newDate = `${date.substring(0, 3)}${newValue}${date.substring(5)}`
          } else {
            let month = parseInt(`${currentMonth.substring(1, 2)}${key}`, 10)
            month = Math.min(Math.max(month, 1), 12)
            newValue = month.toString().padStart(2, "0")
            newDate = `${date.substring(0, 3)}${newValue}${date.substring(5)}`
            newSelectedPart = DatePart.Year
          }
        } else {
          if (trackInput) {
            newValue = `0${key}`
            newDate = `${date.substring(0, 3)}${newValue}${date.substring(5)}`
          } else {
            let month = parseInt(`${currentMonth.substring(1, 2)}${key}`, 10)
            month = Math.min(Math.max(month, 1), 12)
            newValue = month.toString().padStart(2, "0")
            newDate = `${date.substring(0, 3)}${newValue}${date.substring(5)}`
          }
          newSelectedPart = DatePart.Year
        }
        break
      }
      case DatePart.Year: {
        const currentYear = date.substring(6, 10)
        if (currentYear === DatePart.Year) {
          newValue = `000${key}`
          newDate = `${date.substring(0, 6)}${newValue}`
        } else {
          newValue = `${currentYear.substring(1, 4)}${key}`
          newDate = `${date.substring(0, 6)}${newValue}`
        }
        break
      }
      default:
        return
    }

    if (selectedPart !== newSelectedPart) {
      updateLiveText(newSelectedPart)
    } else {
      updateLiveText(selectedPart, newValue)
    }

    setDate(newDate)
    setSelectedPart(newSelectedPart)
    setTrackInput(newSelectedPart !== selectedPart)
  }

  const handleDelete = () => {
    let newDate = date
    switch (selectedPart) {
      case DatePart.Day:
        newDate = DatePart.Day + date.substring(2)
        break
      case DatePart.Month:
        newDate = date.substring(0, 3) + DatePart.Month + date.substring(5)
        break
      case DatePart.Year:
        newDate = date.substring(0, 6) + DatePart.Year
        break
      default:
        break
    }

    setDate(newDate)
    setTrackInput(true)
  }

  const handleCalendarDateChange = (date: Value) => {
    setDate(format(date as Date, "dd/MM/yyyy"))
    setShowCalendar(false)
    focusInput()
  }

  const handleSpanClick = () => {
    if (!isMobile) {
      focusInput()
    }
  }
  const handleContainerClick = () => {
    if (isMobile && !showCalendar) {
      setShowCalendar(true)
      focusInput()
    }
  }

  const handleFocus = () => {
    selectDatePart(DatePart.Day)
    setHasFocus(true)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    updateLiveText(DatePart.None, "")
    selectDatePart(DatePart.None)
    setHasFocus(false)
    if (onBlur) {
      onBlur(event)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text")
    const dateFromISO = parseISO(pastedText)
    const dateFromDDMMYYYY = parse(pastedText, "dd/MM/yyyy", new Date())

    if (!isNaN(dateFromISO.getTime())) {
      setDate(format(dateFromISO, "dd/MM/yyyy", { locale: enGB }))
    } else if (!isNaN(dateFromDDMMYYYY.getTime())) {
      setDate(pastedText)
    } else {
      e.preventDefault()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  useEffect(() => {
    const parsedDate = parse(date, "P", new Date(), { locale: enGB })
    setCalendarDate(isValid(parsedDate) ? parsedDate : new Date())
  }, [date])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!value || value.trim() === "") {
      setDate("dd/mm/yyyy")
    } else {
      setDate(value)
    }
  }, [value])

  useEffect(() => {
    onChange(date)
  }, [date])

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
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}
      <div {...datePickerContainerAttr} onClick={handleContainerClick} onPaste={handlePaste}>
        <div className="date-spans" onClick={handleSpanClick}>
          <span
            className={`date-section${
              selectedPart === DatePart.Day && !isMobile ? " section-selected" : ""
            }`}>
            {date.substring(0, 2)}
          </span>
          <span>/</span>
          <span
            className={`date-section${
              selectedPart === DatePart.Month && !isMobile ? " section-selected" : ""
            }`}>
            {date.substring(3, 5)}
          </span>
          <span>/</span>
          <span
            className={`date-section${
              selectedPart === DatePart.Year && !isMobile ? " section-selected" : ""
            }`}>
            {date.substring(6, 10)}
          </span>
          <span ref={liveRegionRef} className="date-picker-announce" aria-live="assertive"></span>
        </div>
        <input
          id={identifier}
          name={identifier}
          ref={inputRef}
          {...inputAttr}
          value={date}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key === "ArrowRight") {
              handleArrowRight()
            } else if (e.key === "ArrowLeft") {
              handleArrowLeft()
            } else if (e.key === "Tab") {
              e.shiftKey ? handleShiftTab(e) : handleTab(e)
              return
            } else if (e.key === "ArrowUp") {
              if (selectedPart !== DatePart.None) {
                handleUpArrow()
              }
            } else if (e.key === "ArrowDown") {
              if (selectedPart !== DatePart.None) {
                handleDownArrow()
              }
            } else if (e.key === "Delete" || e.key === "Backspace") {
              handleDelete()
            } else if (/[0-9]/.test(e.key)) {
              handleNumericKeyPress(e.key)
            } else if (e.key === " ") {
              toggleCalendar()
            }
            if (!(e.metaKey || (e.ctrlKey && e.key === "v"))) {
              e.preventDefault()
            }
          }}
        />
        <FaRegCalendar size={18} className="calendar-icon" onClick={toggleCalendar} />
        {showCalendar && (
          <div ref={calendarRef} className="calendar-popover">
            <Calendar value={calendarDate} onChange={handleCalendarDateChange} />
          </div>
        )}
      </div>
    </div>
  )
}
