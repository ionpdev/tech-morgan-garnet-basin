import type { UseFormReturn } from "react-hook-form"

type THookFormError = UseFormReturn["formState"]["errors"][string]

export function castErrorToString(error: THookFormError): string | undefined {
  if (typeof error === "string") {
    return error
  }

  if (typeof error?.message === "string") {
    return error.message
  }

  return
}
