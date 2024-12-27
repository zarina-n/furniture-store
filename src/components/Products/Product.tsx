import classNames from "classnames";
import styles from "./Products.module.css";
import Image from "next/image";

export default function Product() {
  return (
    <div className={styles.product}>
      <Image
        src={"/assets/images/top_background.jpg"}
        width={370}
        height={240}
        alt="image"
      />
      <div className={styles.product_name}>Product name</div>
      <p className={styles.product_text}>
        Product description: Модель отличается простотой линий и форм,
        отсутствием броского декора.
      </p>
      <div className={styles.product_price_box}>
        <span className={styles.product_price}>10000</span>
        <span
          className={classNames(
            styles.product_price,
            styles.product_price_sale,
          )}
        >
          5000
        </span>
      </div>
    </div>
  );
}
