import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import styles from './Input.module.css'

interface Props<T extends FieldValues> {
  name: 'email' | 'password' | 'name' | 'repeat_password'
  placeholder: string
  type: string
  className: string
  control: Control<T>
  errors: FieldErrors<T>
}

export default function Input<T extends FieldValues>({
  name,
  placeholder,
  type,
  className,
  control,
  errors,
}: Props<T>) {
  // todo: figure put is react hook form is needed
  return (
    <>
      <Controller
        name={name as Path<T>}
        control={control}
        defaultValue={'' as PathValue<T, Path<T>>}
        render={({ field }) => (
          <input
            {...field}
            className={className}
            placeholder={placeholder}
            type={type}
          />
        )}
      />
      {errors[name]?.message && (
        <p className={styles.error}>{String(errors[name]?.message)}</p>
      )}
    </>
  )
}
