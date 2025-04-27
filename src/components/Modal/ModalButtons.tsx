type Props = {
  clickCancel: () => void
  clickOk: () => void
}

export default function ModalButtons({ clickOk, clickCancel }: Props) {
  return (
    <div>
      <button onClick={clickOk}>OK</button>
      <button onClick={clickCancel}>Cancel</button>
    </div>
  )
}
