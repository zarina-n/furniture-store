'use client'

import { useSearchParams } from 'next/navigation'
import { JSX, useEffect, useRef } from 'react'
import styles from './Modal.module.css'
import Login from '../Login/Login'

export default function Modal() {
  const searchParams = useSearchParams()
  const dialogRef = useRef<null | HTMLDialogElement>(null)

  const showModal = searchParams.get('modal')
  const modal = 'login'

  useEffect(() => {
    if (showModal === 'true') {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [showModal])

  const dialog: JSX.Element | null =
    showModal === 'true' ? (
      <dialog ref={dialogRef} className={styles.modal}>
        <div>{modal === 'login' && <Login />}</div>
      </dialog>
    ) : null

  return dialog
}
