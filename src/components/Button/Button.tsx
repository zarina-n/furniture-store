import cn from 'classnames'
import styles from './Button.module.css'

type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  title: string
  type?: 'button' | 'submit' | 'reset' | undefined
  active?: boolean | undefined
  onButtonClick?: () => void
  size?: ButtonSize
  disabled?: boolean
}

export default function Button({
  title,
  type = 'button',
  active,
  onButtonClick,
  size = 'md',
  disabled = false,
}: Props) {
  return (
    <button
      className={cn(
        styles.button,
        styles[size],
        active && styles.button_active,
        disabled && styles.button_disabled,
      )}
      type={type}
      onClick={onButtonClick}
    >
      {title}
    </button>
  )
}
