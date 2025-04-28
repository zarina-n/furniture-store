import styles from './Modal.module.css'
import cn from 'classnames'

type Props = {
  clickCancel?: () => void
  clickOk: () => void
  okTitle: string | React.JSX.Element
  cancelButton?: boolean
}

export default function ModalButtons({
  clickOk,
  clickCancel,
  okTitle,
  cancelButton,
}: Props) {
  return (
    <div className={styles.modal_buttons}>
      <button
        onClick={clickOk}
        className={cn(styles.modal_button, styles.ok_button)}
      >
        {okTitle}
      </button>
      {cancelButton && (
        <button
          onClick={clickCancel}
          className={cn(styles.modal_button, styles.cancel_button)}
        >
          Cancel
        </button>
      )}
    </div>
  )
}
