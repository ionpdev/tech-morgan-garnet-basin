import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import { SelectInput } from "../SelectInput/SelectInput"
import { useCsrfToken } from "../../hooks/useCsrfToken"
import { useApplicationsContext } from "../../hooks/useApplicationsContext"
import styles from "./CreateApplicationForm.module.css"

const ERROR_REQUIRED = "Required"
const ERROR_MIN_AMOUNT = "Min. Amount >= 1000"
const ERROR_MAX_AMOUNT = "Max. Amount <= 150000"
const ERROR_EMAIL = "Valid email required"
const API_BASE_URL = "http://localhost:3001/api"

type TFormValues = {
  first_name: string
  last_name: string
  email: string
  company: string
  loan_amount: number
  loan_type: string
}

type CreateApplicationFormProps = {
  onSuccess?: () => void
}

export const CreateApplicationForm = ({
  onSuccess,
}: CreateApplicationFormProps) => {
  const methods = useForm<TFormValues>()
  const { token } = useCsrfToken()
  const { addNewApplication } = useApplicationsContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (values: TFormValues) => {
    if (!token) {
      setSubmitError("CSRF token not available")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrftoken": token,
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          company: values.company,
          loan_amount: Number(values.loan_amount),
          loan_type: values.loan_type,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create application: ${response.status}`)
      }

      const newApplication = await response.json()

      // Add the new application to the list optimistically
      addNewApplication(newApplication)

      methods.reset()
      onSuccess?.()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          <Input
            id="first_name"
            label="First Name"
            validation={{
              required: { value: true, message: ERROR_REQUIRED },
            }}
          />
          <Input
            id="last_name"
            label="Last Name"
            validation={{
              required: { value: true, message: ERROR_REQUIRED },
            }}
          />
        </div>

        <div className={styles.formRow}>
          <Input
            id="email"
            label="Email"
            type="email"
            validation={{
              required: { value: true, message: ERROR_REQUIRED },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: ERROR_EMAIL,
              },
            }}
          />
          <Input
            id="company"
            label="Company"
            validation={{
              required: { value: true, message: ERROR_REQUIRED },
            }}
          />
        </div>

        <div className={styles.formRow}>
          <Input
            id="loan_amount"
            label="Amount"
            type="number"
            validation={{
              required: { value: true, message: ERROR_REQUIRED },
              min: { value: 1000, message: ERROR_MIN_AMOUNT },
              max: { value: 150000, message: ERROR_MAX_AMOUNT },
            }}
          />
          <SelectInput
            id="loan_type"
            label="Loan Type"
            options={[
              ["Flexi-Loan", "Flexi-Loan"],
              ["Business Loan", "Business Loan"],
              ["Cash Advance", "Cash Advance"],
              ["RLS", "RLS"],
              ["CBILS", "CBILS"],
            ]}
          />
        </div>

        {submitError && <div className={styles.submitError}>{submitError}</div>}
        <Button
          className={styles.submitButton}
          disabled={isSubmitting || !token}
        >
          {isSubmitting ? "Creating..." : "Create new application"}
        </Button>
      </form>
    </FormProvider>
  )
}
