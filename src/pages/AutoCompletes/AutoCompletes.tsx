import { ReactElement } from "react"
import { AutoComplete, AutoComplete2 } from "components"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Option } from "types"
import * as yup from "yup"

interface VehicleData {
  make: string
  model: string
  make2: string
}

const vehicleMakes: Option[] = [
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

const vehicleModels: Option[] = [
  { label: "MODEL 1", value: "MODEL 1" },
  { label: "MODEL 2", value: "MODEL 2" },
  { label: "MODEL 3", value: "MODEL 3" }
]

const schema = yup.object().shape({
  make: yup.string().trim().required("Please select a make of vehicle"),
  model: yup.string().trim().required("Please select a model of vehicle"),
  make2: yup.string().trim().required("Please select a make of vehicle")
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
          <AutoComplete2
            identifier="make"
            label="Make (New - allow create)"
            labelClassExt="govuk-label-s"
            containerClassExt="govuk-input--width-20"
            hint="Test Autocomplete"
            allowCreate={true}
            useUpperCase={true}
            options={vehicleMakes}
            value={vehicleMakes.find(x => x.value === value)}
            onChange={x => onChange(x?.value)}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="model"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <AutoComplete2
            identifier="model"
            label="Model (New - no create)"
            labelClassExt="govuk-label-s"
            containerClassExt="govuk-input--width-20"
            hint="Test Autocomplete"
            useUpperCase={true}
            options={vehicleModels}
            value={vehicleModels.find(x => x.value === value)}
            onChange={x => onChange(x?.value)}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="make2"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <AutoComplete
            identifier="make2"
            label="Make (Old - allow create)"
            labelClassExt="govuk-label-s"
            containerClassExt="govuk-input--width-20"
            hint="Does provide item creation"
            useUpperCase={true}
            allowCreate={true}
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
