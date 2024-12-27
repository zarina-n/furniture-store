"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./CartProduct.module.css";

interface Props {
  // TODO: replace with type from types.ts
  name: string;
  imgSrc: string;
  description: string;
  price: number;
  priceBeforeDiscount?: number | null | undefined;
  id: number;
}

export default function CartProduct({
  // TODO: add form for input
  name,
  imgSrc,
  description,
  price,
  id,
}: Props) {
  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_info}>
        <div className={styles.cart_item_box}>
          <Link href={`/catalog/${id}`}>
            <Image src={imgSrc} width={173} height={173} alt={name} />
          </Link>
          <div>
            <h3 className={styles.cart_product_name}>{name}</h3>
            <p className={styles.cart_product_text}>{description}</p>
            <span className={styles.cart_product_price}>{price}</span>
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
            name="quantity" // TODO: add constant
            min="1"
            value="1"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
