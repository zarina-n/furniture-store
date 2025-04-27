import { RxCross2 } from 'react-icons/rx'
import styles from './Modal.module.css'

type Props = {
  title: string
  closeModal: () => void
  children: React.ReactNode
}

export default function ModalWrapper({ title, closeModal, children }: Props) {
  return (
    <div className={styles.dialog_container}>
      <div className={styles.dialog_header}>
        <h1 className={styles.dialog_title}>{title}</h1>
        <button onClick={closeModal} className={styles.close_button}>
          <RxCross2 />
        </button>
      </div>
      <div className={styles.dialog_body}>{children}</div>
    </div>
  )
}
