import { ReactElement } from "react"
import { useForm, Controller } from "react-hook-form"
import { DateInput, DatePicker } from "components"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface DateData {
  html5: string
}

const schema = yup.object().shape({
  html5: yup.string().trim().required("Please select a date")
})

export const Dates = (): ReactElement => {
  const { control, handleSubmit } = useForm<DateData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      html5: ""
    }
  })

  const onSubmit = (formData: DateData) => {
    console.log("Form Data: ", formData)
  }

  return (
    <form className="govuk-!-margin-top-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="govuk-grid-row">
        <Controller
          control={control}
          name="html5"
          render={({ field: { onChange } }) => (
            <input
              id="html5"
              className="govuk-input"
              aria-label="Date"
              type="date"
              lang="en-GB"
              onChange={x => onChange(x)}
            />
          )}
        />
      </div>
      <div className="govuk-grid-row govuk-!-margin-top-3">
        <DateInput identifier="test1" />
      </div>
      <div className="govuk-grid-row">
        <DatePicker />
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-button-group">
          <button type="submit" className="govuk-button govuk-!-margin-top-2">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}
