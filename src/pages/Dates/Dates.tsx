import { ReactElement } from "react"
import { useForm, Controller } from "react-hook-form"
import { DatePicker, InputWidth, DayEnum } from "react-govuk-datepicker"
import { parse, isValid } from "date-fns"
import { enGB } from "date-fns/locale"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface DateData {
  licenceIssued: string
  passportIssued: string
}

const schema = yup.object().shape({
  licenceIssued: yup
    .string()
    .required("Driving licence issue date is a required field")
    .test("required", "Please enter driving licence issue date", value => value !== "dd/mm/yyyy")
    .test("valid", "Driving licence issue date is not a valid date", value =>
      isValid(parse(value!, "P", new Date(), { locale: enGB }))
    ),
  passportIssued: yup
    .string()
    .required("Passport issue date is a required field")
    .test("required", "Please enter passport issue date", value => value !== "dd/mm/yyyy")
    .test("valid", "Passport issue date is not a valid date", value =>
      isValid(parse(value!, "P", new Date(), { locale: enGB }))
    )
})

export const Dates = (): ReactElement => {
  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<DateData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      // passportIssued: "12/02/2024"
    }
  })

  const onSubmit = (formData: DateData) => {
    console.log("Form Data: ", formData)
  }

  const licenceIssuedValue = watch("licenceIssued")
  return (
    <form className="govuk-!-margin-top-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="govuk-grid-row">
        <div className="govuk-form-group">
          <label htmlFor="html5" className="govuk-label" id="html5-label">
            HTML5 Date Control for Reference
          </label>
          <input id="html5" className="govuk-input" aria-label="Date" type="date" lang="en-GB" />
        </div>
      </div>
      <div className="govuk-grid-row govuk-!-margin-top-4">
        <DatePicker
          identifier="licenceIssued"
          label="When was your driving licence issued?"
          hint="React hook form register"
          width={InputWidth.Char10}
          multiQuestion={true}
          calendarStartDay={DayEnum.Monday}
          value={licenceIssuedValue}
          {...(register("licenceIssued"),
          {
            error: errors.licenceIssued?.message,
            onChange: (value: string) => {
              setValue("licenceIssued", value)
            }
          })}
        />
        <Controller
          control={control}
          name="passportIssued"
          render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
            <DatePicker
              identifier="passportIssued"
              label="When was your passport issued?"
              hint="React hook form controller"
              width={InputWidth.Char10}
              multiQuestion={true}
              calendarStartDay={DayEnum.Monday}
              value={value}
              error={error?.message}
              onChange={x => onChange(x)}
              onBlur={onBlur}
            />
          )}
        />
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-button-group">
          <button
            type="submit"
            className="govuk-button govuk-!-margin-top-4"
            aria-label="Submit form">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}
