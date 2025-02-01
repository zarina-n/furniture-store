'use client'

import styles from './Auth.module.css'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupFormDataSchema } from '@/lib/schemas'
import { z } from 'zod'
import { signUpInputs } from '@/lib/authData'
import { signUserUp } from '@/api/actions'
import { EMAIL_ALREADY_IN_USE } from '@/lib/firebaseErrorCodes'
import { ACCOUNT_URL } from '@/lib/constants'
import AuthForm from './AuthForm'

export type SignupFormValues = z.infer<typeof SignupFormDataSchema>

export default function Signup() {
  const pathName = usePathname()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SignupFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeat_password: '',
    },
    resolver: zodResolver(SignupFormDataSchema),
  })

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    const { success, error, message } = await signUserUp(data)

    reset()

    if (success) {
      router.push(ACCOUNT_URL)

      // TODO: add a popup
    } else {
      if (error === EMAIL_ALREADY_IN_USE) {
        setError('email', { type: 'manual', message })
      } else {
        setError('repeat_password', { type: 'manual', message })
      }
    }
  }

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      pathName={pathName}
      modal="signup"
    >
      {signUpInputs.map(({ name, type, placeholder }) => (
        <Input<SignupFormValues>
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
