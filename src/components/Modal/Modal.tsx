'use client'

import { useSearchParams } from 'next/navigation'
import { JSX, useEffect, useRef } from 'react'
import styles from './Modal.module.css'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'

export default function Modal() {
  const searchParams = useSearchParams()
  const dialogRef = useRef<null | HTMLDialogElement>(null)

  const modal = searchParams.get('modal')

  useEffect(() => {
    if (modal === 'login' || modal === 'signup') {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [modal])

  const dialog: JSX.Element | null =
    modal === 'login' || modal === 'signup' ? ( // TODO: refactor
      <dialog ref={dialogRef} className={styles.modal}>
        <div>{modal === 'login' ? <Login /> : <Signup />}</div>
      </dialog>
    ) : null

  return dialog
}
