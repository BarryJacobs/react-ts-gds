import { ReactElement, useMemo } from "react"
import { AutoComplete } from "components"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LabelValuePair } from "interfaces"
import * as yup from "yup"

interface VehicleData {
  make: string
  model: string
}

const vehicleMakes: LabelValuePair[] = [
  { label: "ASTON MARTIN", value: "01" },
  { label: "AUDI", value: "02" },
  { label: "BMW", value: "03" },
  { label: "CITROEN", value: "04" },
  { label: "FERRARI", value: "05" },
  { label: "FORD", value: "06" },
  { label: "HONDA", value: "07" },
  { label: "LAMBORGHINI", value: "08" },
  { label: "PEUGEOT", value: "09" },
  { label: "TOYOTA", value: "10" }
]

const schema = yup.object().shape({
  make: yup.string().trim().required("Please select a make of vehicle"),
  model: yup.string().trim().required("Please select a model of vehicle")
})

export const AutoCompletes = (): ReactElement => {
  const vehicleModels = useMemo(() => {
    const items: LabelValuePair[] = []
    for (let i = 1; i <= 10000; i++) {
      const item: LabelValuePair = {
        label: `MODEL ${i}`,
        value: `MODEL ${i}`
      }
      items.push(item)
    }
    return items
  }, [])

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
            hint="Simple with no create"
            useUpperCase={true}
            options={vehicleMakes}
            value={vehicleMakes.find(x => x.value === value)}
            getOptionLabel={x => x.label}
            onChange={x => onChange(x?.value)}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="model"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <AutoComplete
            identifier="model"
            label="Model"
            labelClassExt="govuk-label-s"
            containerClassExt="govuk-input--width-20"
            hint="Large dataset and create"
            allowCreate={true}
            useUpperCase={true}
            options={vehicleModels}
            value={vehicleModels.find(x => x.value === value)}
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
