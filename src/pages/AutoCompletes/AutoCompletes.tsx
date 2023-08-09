import { ReactElement } from "react"
import { AutoComplete } from "components"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface NameValuePair {
  label: string
  value: string
}

interface VehicleData {
  make: string
}

const vehicleMakes: NameValuePair[] = [
  { label: "Aston Martin", value: "01" },
  { label: "Audi", value: "02" },
  { label: "BMW", value: "03" },
  { label: "Citroen", value: "04" },
  { label: "Ferrari", value: "05" },
  { label: "Ford", value: "06" },
  { label: "Honda", value: "07" },
  { label: "Lamborghini", value: "08" },
  { label: "Peugeot", value: "09" },
  { label: "Toyota", value: "10" }
]

const schema = yup.object().shape({
  make: yup.string().trim().required("Please select a make of vehicle")
})

export const AutoCompletes = (): ReactElement => {
  const { control, handleSubmit } = useForm<VehicleData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      make: ""
    }
  })

  const onSubmit = (formData: VehicleData) => {
    console.log("Form Data: ", formData)
  }

  return (
    <form className="govuk-!-margin-top-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        control={control}
        name="make"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <AutoComplete
            identifier="make"
            label="Make"
            labelClassExt="govuk-label-s"
            containerClassExt="govuk-input--width-20"
            options={vehicleMakes}
            value={vehicleMakes.find(x => x.value === value)}
            getOptionLabel={x => x.label}
            onChange={x => onChange(x?.value)}
            error={error?.message}
          />
        )}
      />
      <div className="govuk-button-group">
        <button type="submit" className="govuk-button">
          Submit
        </button>
      </div>
    </form>
  )
}
