import styles from './Modal.module.css'
import { ModalProps } from '@/lib/types'
import ModalButtons from './ModalButtons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ProgressModal({ modalRef }: ModalProps) {
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
  return (
    <div className={styles.progressModalContent}>
      <p className={styles.modalDescription}>
        We&apos;re working on the following features:
      </p>
      <ul className={styles.progressList}>
        <li className={styles.progressItem}>Responsive design</li>
        <li className={styles.progressItem}>Account page</li>
        <li className={styles.progressItem}>Checkout process</li>
        <li className={styles.progressItem}>
          Product database (Currently, there are only 3 products)
        </li>
        <li className={styles.progressItem}>Authentication on production</li>
        <li className={styles.progressItem}>Minor styles inconsistencies</li>
      </ul>
      <p className={styles.thankYouMessage}>Thanks for your patience!</p>
      <ModalButtons clickOk={closeModal} okTitle="Close" />
    </div>
  )
}
