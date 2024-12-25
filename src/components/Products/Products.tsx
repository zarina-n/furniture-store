import Product from "./Product";
import styles from "./Products.module.css";

interface Props {
  heading: string;
}

export default function Products({ heading }: Props) {
  return (
    <div className={styles.product_box}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.product_content}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
}
