'use client'

import { ModalProps } from '@/lib/types'
import React from 'react'
import ModalButtons from './ModalButtons'
import { useCartSyncStore } from '@/stores/cartSyncStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function MergeCarts({ modalRef }: ModalProps) {
  //todo: check again title and modal text
  const { setHasSynced, setHasMerged } = useCartSyncStore()
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
    setHasSynced(true)
    setHasMerged(true)
    closeModal()
  }

  const clickCancel = () => {
    setHasMerged(false)
    closeModal()
  }
  return (
    <div>
      <p>Would you like to merge them with your current cart items?</p>
      <ModalButtons clickOk={clickOk} clickCancel={clickCancel} />
    </div>
  )
}
