import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input/Input'
import styles from './Auth.module.css'
import { z } from 'zod'
import { ForgotPasswordFormDataSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendResetPasswordLink } from '@/api/actions'
import { usePathname, useRouter } from 'next/navigation'
import AuthForm from './AuthForm'

export type ForgotPasswordFormValues = z.infer<
  typeof ForgotPasswordFormDataSchema
>

export default function ForgotPassword() {
  const pathName = usePathname()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(ForgotPasswordFormDataSchema),
  })

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    const { success, message } = await sendResetPasswordLink(data.email)

    //todo: add popup saying that user should check the email
    reset()
    if (success) {
      router.replace(`${pathName}`)
      // TODO: add a popup
    } else {
      setError('email', {
        type: 'manual',
        message: message ?? 'An error occurred',
      })
    }
  }

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      pathName={pathName}
      modal="forgot_password"
    >
      <Input<ForgotPasswordFormValues>
        name={'email'}
        type={'email'}
        placeholder={'Enter your email'}
        control={control}
        className={styles.form_input}
        errors={errors}
      />
    </AuthForm>
  )
}
