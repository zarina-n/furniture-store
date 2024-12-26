import Products from "@/components/Products/Products";
import styles from "./page.module.css";
import CartForm from "@/components/CartForm/CartForm";
import CartProduct from "@/components/CartProduct/CartProduct";
import classNames from "classnames";

export default function Cart() {
  return (
    <>
      <div className={classNames(styles.cart, "center")}>
        <div className={styles.cart_content}>
          <div className={styles.cart_content_top}>
            <p className={styles.cart_text}>Product</p>
            <p className={styles.cart_text}>Quantity</p>
          </div>
          {new Array(2).fill(<CartProduct />).map((_, i) => (
            <CartProduct key={i} />
          ))}

          <div className={styles.cart_button_box}>
            <button className={styles.cart_button} type="reset">
              Empty the cart
            </button>
            <button className={styles.cart_button}>Continue shopping</button>
          </div>
        </div>
        <CartForm />
      </div>

      <div className="center">
        <Products heading="Special Offers" numberOfProducts={3} />
      </div>
    </>
  );
}
