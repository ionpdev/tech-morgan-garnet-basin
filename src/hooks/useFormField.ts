import { type RegisterOptions, useFormContext } from "react-hook-form"
import { castErrorToString } from "../components/CreateApplicationForm/formUtils"

export const useFormField = (id: string) => {
  const { formState, register } = useFormContext()

  const hasSubmitted = formState.submitCount > 0
  const error = castErrorToString(formState.errors[id])
  const showError = Boolean(
    (hasSubmitted || formState.touchedFields[id]) && error
  )

  return {
    showError,
    error,
    register: (validation: RegisterOptions) => register(id, validation),
  }
}
