import { ReactElement, useMemo, useState } from "react"
import { AutoComplete, LabelValuePair } from "react-govuk-autocomplete"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface VehicleData {
  make: string
  model: string
}

const vehicleMakes: LabelValuePair[] = [
  { label: "ASTON MARTIN", value: "ASTON MARTIN" },
  { label: "AUDI WITH A VERY LONG DESCRIPTION THAT WRAPS OVER THE NEXT LINE", value: "AUDI" },
  { label: "BMW", value: "BMW" },
  { label: "CITROEN", value: "CITROEN" },
  { label: "FERRARI", value: "FERRARI" },
  { label: "FORD", value: "FORD" },
  { label: "HONDA", value: "HONDA" },
  { label: "LAMBORGHINI", value: "LAMBORGHINI" },
  { label: "PEUGEOT", value: "PEUGEOT" },
  { label: "TOYOTA", value: "TOYOTA" }
]

const schema = yup.object().shape({
  make: yup.string().trim().required("Please select a make of vehicle"),
  model: yup.string().trim().required("Please select a model of vehicle")
})

export const AutoCompletes = (): ReactElement => {
  const [selectedMake, setSelectedMake] = useState<string | undefined>("BMW")
  const [isFetchingModels, setIsFetchingModels] = useState(false)

  const vehicleModels = useMemo(() => {
    const items: LabelValuePair[] = []
    if (selectedMake) {
      for (let i = 1; i <= 50000; i++) {
        const item: LabelValuePair = {
          label: `${selectedMake} MODEL ${i}`,
          value: `${selectedMake} MODEL ${i}`
        }
        items.push(item)
      }
      setTimeout(() => {
        setIsFetchingModels(false)
      }, 2000)
    }
    return items
  }, [selectedMake])

  const { control, handleSubmit, setValue } = useForm<VehicleData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      make: "BMW",
      model: "BMW MODEL 3"
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
            onChange={(value, _isNew) => {
              onChange(value?.value)
              setSelectedMake(value?.value)
              setIsFetchingModels(true)
              setValue("model", "")
            }}
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
            hint="Large dataset, create and async loading"
            allowCreate={true}
            useUpperCase={true}
            options={vehicleModels}
            value={vehicleModels.find(x => x.value === value)}
            getOptionLabel={x => x.label}
            onChange={(value, isNew) => {
              if (value && isNew) {
                vehicleModels.unshift(value)
              }
              onChange(value?.value)
            }}
            error={error?.message}
            isDisabled={vehicleModels.length === 0 || isFetchingModels}
            isLoading={isFetchingModels}
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
