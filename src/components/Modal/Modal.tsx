'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { JSX, useEffect, useMemo, useRef } from 'react'
import styles from './Modal.module.css'
import MergeCarts from './MergeCarts'
import ModalWrapper from './ModalWrapper'
import {
  LOGIN_MODAL,
  MERGE_CARTS_MODAL,
  PROGRESS_MODAL,
  PROGRESS_MODAL_SHOWN,
} from '@/lib/constants'
import LoginModal from './LoginModal'
import ProgressModal from './ProgressModal'

export default function Modal() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const modalRef = useRef<null | HTMLDialogElement>(null)
  const showModal = searchParams.get('showModal')

  const modalsMap: Record<string, { component: JSX.Element; title: string }> =
    useMemo(
      () => ({
        [MERGE_CARTS_MODAL]: {
          component: <MergeCarts modalRef={modalRef} />,
          title: 'We found items saved in your local cart.',
        },
        [LOGIN_MODAL]: {
          component: <LoginModal modalRef={modalRef} />,
          title: "Oops! Looks like you're not logged in.",
        },
        [PROGRESS_MODAL]: {
          component: <ProgressModal modalRef={modalRef} />,
          title: 'Features in Progress',
        },
      }),
      [modalRef],
    )

  const closeModal = () => {
    modalRef.current?.close()
    const params = new URLSearchParams(searchParams.toString())
    params.delete('showModal')
    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    })
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (
      pathName === '/' &&
      (localStorage.getItem(PROGRESS_MODAL_SHOWN) === 'false' ||
        !localStorage.getItem(PROGRESS_MODAL_SHOWN))
    ) {
      params.set('showModal', PROGRESS_MODAL)
      router.replace(`${pathName}?${params.toString()}`, {
        scroll: false,
      })
    }

    if (!!showModal) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [showModal, pathName, router, searchParams])

  return (
    <dialog
      ref={modalRef}
      className={styles.dialog}
      style={{ display: showModal ? 'block' : 'none' }}
    >
      {showModal && modalsMap[showModal] && (
        <ModalWrapper
          title={modalsMap[showModal].title}
          closeModal={closeModal}
        >
          {modalsMap[showModal].component}
        </ModalWrapper>
      )}
    </dialog>
  )
}
