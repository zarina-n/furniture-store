'use client'

// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '@/firebase/firebase'
import Link from 'next/link'
import styles from './Login.module.css'
import { RiCloseLargeLine } from 'react-icons/ri'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormDataSchema } from '@/lib/schemas'
import { z } from 'zod'
import { loginUser } from '@/api/actions/actions'
import { loginInputs } from '@/lib/authInputs'

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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.form_heading}>Login form</h3>
      <div className={styles.form_inputs}>
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
      </div>
      <button
        type="submit"
        className={styles.form_button}
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? 'Login in...' : 'Login'}
      </button>
      <div className={styles.form_buttons}>
        <p>Do not have an account?</p>
        <Link
          className={styles.signup_link}
          href={`${pathName}?modal=signup`}
          replace
          shallow
        >
          Sign up now
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
