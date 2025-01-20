import Link from 'next/link'
import styles from './page.module.css'
import { RiCloseLargeLine } from 'react-icons/ri'

export default function LoginPage({ onClose }: { onClose: () => void }) {
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
      <button className={styles.form_close_button} onClick={onClose}>
        <RiCloseLargeLine />
      </button>
    </form>
  )
}
