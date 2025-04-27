'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { JSX, useEffect, useMemo, useRef } from 'react'
import styles from './Modal.module.css'
import MergeCarts from './MergeCarts'
import ModalWrapper from './ModalWrapper'
import { MERGE_CARTS_MODAL } from '@/lib/constants'

export default function Modal() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const modalRef = useRef<null | HTMLDialogElement>(null)
  const showModal = searchParams.get('showModal')

  const modalsMap: Record<string, JSX.Element> = useMemo(
    () => ({
      [MERGE_CARTS_MODAL]: <MergeCarts modalRef={modalRef} />,
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
    if (!!showModal) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [showModal])

  return (
    <dialog ref={modalRef} className={styles.dialog}>
      {showModal && modalsMap[showModal] && (
        <ModalWrapper
          title="We found items saved in your local cart."
          closeModal={closeModal}
        >
          {modalsMap[showModal]}
        </ModalWrapper>
      )}
    </dialog>
  )
}
