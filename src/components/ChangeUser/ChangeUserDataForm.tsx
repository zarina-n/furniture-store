import { FormEventHandler, useState } from 'react'
import styles from './ChangeUser.module.css'
import Button from '../Button/Button'
import { changeUserFormProps } from '@/lib/authData'

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  children: React.ReactNode
  isSubmitting: boolean
  isLoading: boolean
  changeType: 'username' | 'email' | 'password'
}

export default function ChangeUserDataForm({
  onSubmit,
  children,
  isLoading,
  isSubmitting,
  changeType,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.toggle_button}
      >
        {changeUserFormProps[changeType].header}
      </div>
      {isOpen && (
        <div className={styles.form_inputs}>
          {children}
          <Button
            title={isLoading || isSubmitting ? 'Submitting...' : 'Submit'}
            active={true}
            disabled={isSubmitting}
            type="submit"
          />
        </div>
      )}
    </form>
  )
}
