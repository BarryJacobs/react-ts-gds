import { ReactElement } from "react"
import { useForm, Controller } from "react-hook-form"
import { DatePicker, InputWidth } from "react-govuk-datepicker"
import { parse, isValid } from "date-fns"
import { enGB } from "date-fns/locale"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface DateData {
  datePicker: string
}

const schema = yup.object().shape({
  datePicker: yup
    .string()
    .required()
    .test("required", "Please enter issue date", value => value !== "dd/mm/yyyy")
    .test("valid", "Issue date is not a valid date", value =>
      isValid(parse(value!, "P", new Date(), { locale: enGB }))
    )
})

export const Dates = (): ReactElement => {
  const { control, handleSubmit } = useForm<DateData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      datePicker: ""
    }
  })

  const onSubmit = (formData: DateData) => {
    console.log("Form Data: ", formData)
  }

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
        <Controller
          control={control}
          name="datePicker"
          render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
            <DatePicker
              identifier="datePicker"
              label="When was your passport issued?"
              hint="For example, 27/03/2007"
              width={InputWidth.Char10}
              multiQuestion={true}
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
