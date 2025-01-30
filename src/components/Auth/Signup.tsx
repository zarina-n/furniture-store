'use client'

import Link from 'next/link'
import styles from './Auth.module.css'
import { RiCloseLargeLine } from 'react-icons/ri'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupFormDataSchema } from '@/lib/schemas'
import { z } from 'zod'
import { signUpInputs } from '@/lib/authInputs'
import { signUserUp } from '@/api/actions/actions'
import { EMAIL_ALREADY_IN_USE } from '@/lib/firebaseErrorCodes'
import { ACCOUNT_URL } from '@/lib/constants'

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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.form_heading}>Sign up form</h3>
      <div className={styles.form_inputs}>
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
      </div>
      <p className={styles.signup_text}>
        By signing up, I agree to the Privacy Police and the Terms of Services.
      </p>

      <button
        type="submit"
        className={styles.form_button}
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? 'Signing up...' : ' Sign Up'}
      </button>
      <div className={styles.form_buttons}>
        <Link
          className={styles.signup_link}
          href={`${pathName}?modal=login`}
          replace
          shallow
        >
          Back to Login
        </Link>
      </div>
      <Link
        className={styles.form_close_button}
        href={`${pathName}`}
        replace
        shallow
      >
        <RiCloseLargeLine />
      </Link>
    </form>
  )
}
