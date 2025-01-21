'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { RiCloseLargeLine } from 'react-icons/ri'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const updatedQuery = new URLSearchParams(searchParams.toString()) // TODO: repeated code
  updatedQuery.delete('modal')
  return (
    <form className={styles.form}>
      <h3 className={styles.form_heading}>Login form</h3>
      <div className={styles.form_inputs}>
        <input
          className={styles.form_input}
          type="email"
          placeholder="Enter your email"
        />
        <input
          className={styles.form_input}
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className={styles.form_button}>
        Login
      </button>
      <div className={styles.form_buttons}>
        <p>Not a member?</p> <Link href="/signup">Sign up now</Link>
      </div>
      <Link
        className={styles.form_close_button}
        href={`${pathName}?${updatedQuery.toString()}`}
        replace
        shallow
      >
        <RiCloseLargeLine />
      </Link>
    </form>
  )
}
