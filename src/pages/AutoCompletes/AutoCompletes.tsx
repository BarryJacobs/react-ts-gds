import { ReactElement, useMemo, useState } from "react"
import { AutoComplete, LabelValuePair } from "react-govuk-autocomplete"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface VehicleData {
  colour: string
  make: string
  model: string
}

const colours: LabelValuePair[] = [
  { label: "BLACK", value: "BLACK" },
  { label: "BLUE", value: "BLUE" },
  { label: "GREEN", value: "GREEN" },
  { label: "RED", value: "RED" },
  { label: "SILVER", value: "SILVER" },
  { label: "WHITE", value: "WHITE" }
]

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
  colour: yup.string().trim().required("Please select the colour of the vehicle"),
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

  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors }
  } = useForm<VehicleData>({
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

  const colourValue = watch("colour")

  return (
    <form className="govuk-!-margin-top-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      <AutoComplete
        identifier="colour"
        label="Colour"
        labelClassExt="govuk-label-s"
        containerClassExt="govuk-input--width-20"
        hint="Simple with no create (register)"
        useUpperCase={true}
        options={colours}
        value={colours.find(x => x.value === colourValue)}
        {...(register("colour"),
        {
          error: errors.colour?.message,
          onChange: (value, _isNew) => {
            setValue("colour", value?.value ?? "")
          }
        })}
      />
      <Controller
        control={control}
        name="make"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <AutoComplete
            identifier="make"
            label="Make"
            labelClassExt="govuk-label-s"
            containerClassExt="govuk-input--width-20"
            hint="Simple with no create (controller)"
            useUpperCase={true}
            options={vehicleMakes}
            value={vehicleMakes.find(x => x.value === value)}
            onChange={(value, _isNew) => {
              onChange(value?.value ?? null)
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
            onChange={(value, isNew) => {
              if (value && isNew) {
                vehicleModels.unshift(value)
              }
              onChange(value?.value ?? null)
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
