import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import styles from './Input.module.css'
import { AuthInputName } from '@/lib/types'

interface Props<T extends FieldValues> {
  name: AuthInputName
  placeholder: string
  type: string
  className: string
  control: Control<T>
  errors: FieldErrors<T>
  id?: string
}

export default function Input<T extends FieldValues>({
  name,
  placeholder,
  type,
  className,
  control,
  errors,
}: Props<T>) {
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
