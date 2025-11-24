import { useFormField } from "../../hooks/useFormField"
import styles from "./SelectInput.module.css"

export interface SelectInputProps {
  id: string
  label: string
  options: [string, string][]
  validation?: { required?: { value: boolean; message: string } }
}

const ERROR_REQUIRED = "Required"

export const SelectInput = ({
  id,
  label,
  options,
  validation,
}: SelectInputProps) => {
  const { showError, error, register } = useFormField(id)

  return (
    <span className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={styles.input}
        {...register(
          validation || {
            required: { value: true, message: ERROR_REQUIRED },
          }
        )}
        defaultValue=""
      >
        <option value="" disabled>
          Please select a type
        </option>
        {options.map(([value, label]: [string, string]) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      {showError ? <span className={styles.error}>{error}</span> : null}
    </span>
  )
}
