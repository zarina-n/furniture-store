import styles from './CartForm.module.css'

export default function CartForm() {
  return (
    <div className={styles.form}>
      <h3 className={styles.form_heading}>Place an order</h3>
      <form className={styles.cart_info} action="#">
        <div className={styles.form_input_box}>
          <input
            className={styles.form_input}
            type="text"
            name="username"
            placeholder="Jane Doe"
          />
          <input
            className={styles.form_input}
            type="tel"
            name="userphone"
            placeholder="+ 1 904 000 8080"
          />
          <input
            className={styles.form_input}
            type="text"
            name="useraddress"
            placeholder="Shipping address"
          />
        </div>
        <div className={styles.submit}>
          <p className={styles.form_text}>Total: amount</p>
          <button className={styles.form_button} type="submit">
            Place an order
          </button>
        </div>
      </form>
    </div>
  )
}
