'use client'

import styles from './Auth.module.css'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormDataSchema } from '@/lib/schemas'
import { z } from 'zod'
import { loginUser } from '@/api/actions'
import { loginInputs } from '@/lib/authData'
import AuthForm from './AuthForm'

export type LoginFormValues = z.infer<typeof LoginFormDataSchema>

export default function Login() {
  const pathName = usePathname()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginFormDataSchema),
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { success, message } = await loginUser(data)

    reset()

    if (success) {
      router.replace(`${pathName}`)
      // TODO: add a popup
    } else {
      setError('password', { type: 'manual', message })
    }
  }

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      pathName={pathName}
      modal="login"
    >
      {loginInputs.map(({ name, type, placeholder }) => (
        <Input<LoginFormValues>
          key={name}
          name={name}
          type={type}
          placeholder={placeholder}
          control={control}
          className={styles.form_input}
          errors={errors}
        />
      ))}
    </AuthForm>
  )
}
