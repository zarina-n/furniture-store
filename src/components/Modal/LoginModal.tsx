'use client'

import { ModalProps } from '@/lib/types'
import React from 'react'
import ModalButtons from './ModalButtons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'

export default function LoginModal({ modalRef }: ModalProps) {
  //todo: check again title and modal text
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const closeModal = () => {
    modalRef.current?.close() //todo: repeated code
    const params = new URLSearchParams(searchParams.toString())
    params.delete('showModal')
    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    })
  }

  const clickOk = () => {
    closeModal()
  }

  return (
    <div>
      <p>Log in to add this item to your favorites and keep shopping!</p>
      <ModalButtons
        okTitle={<LoginLink onClick={clickOk}>Login</LoginLink>}
        clickOk={clickOk}
        clickCancel={clickOk}
      />
    </div>
  )
}
