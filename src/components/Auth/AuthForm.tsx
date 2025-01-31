import { RiCloseLargeLine } from 'react-icons/ri'
import styles from './Auth.module.css'
import Link from 'next/link'
import React, { FormEventHandler } from 'react'
import Button from '../Button/Button'
import { formProps } from '@/lib/authData'

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  children: React.ReactNode
  isSubmitting: boolean
  isLoading: boolean
  pathName: string
  modal: 'login' | 'signup' | 'forgot_password'
}

export default function AuthForm({
  onSubmit,
  children,
  isSubmitting,
  isLoading,
  pathName,
  modal,
}: Props) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.form_heading}>{formProps[modal].header}</h3>
      <div className={styles.form_inputs}>{children}</div>
      {modal === 'signup' && (
        <p className={styles.signup_text}>{formProps[modal].signupText}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        title={isSubmitting || isLoading ? '...' : formProps[modal].submitText} // add loading animation
        active
        size="lg"
      />
      <div className={styles.form_buttons}>
        <Link
          className={styles.go_to_link}
          href={`${pathName}?modal=${formProps[modal].goToLink}`}
          replace
          shallow
        >
          {formProps[modal].goToText}
        </Link>
      </div>
      {modal === 'login' && (
        <Link
          href={`${pathName}?modal=forgot-password`}
          className={styles.go_to_link}
        >
          {formProps[modal].forgotPassword}
        </Link>
      )}
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
