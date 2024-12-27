"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./CartProduct.module.css";

export default function CartProduct() {
  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_info}>
        <div className={styles.cart_item_box}>
          <Link href="#">
            <Image
              src="/assets/images/cart_1.jpg"
              width={173}
              height={173}
              alt=""
            />
          </Link>
          <div>
            <h3 className={styles.cart_product_name}>Table MENU</h3>
            <p className={styles.cart_product_text}>
              Для того чтобы трапезничать было приятно, необходим правильный
              обеденный стол.
            </p>
            <span className={styles.cart_product_price}>3400</span>
            <div className={styles.cart_link_box}>
              <p className={styles.cart_link}>Favorites</p>
              <p className={styles.cart_link}>Remove</p>
            </div>
          </div>
        </div>
        <div className={styles.cart_input}>
          <input
            className={styles.cart_quantity}
            type="number"
            name="quantity"
            min="1"
            value="1"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
