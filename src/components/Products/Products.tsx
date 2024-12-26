import Product from "./Product";
import styles from "./Products.module.css";

interface Props {
  heading?: string;
  numberOfProducts: number;
}

export default function Products({ heading, numberOfProducts }: Props) {
  return (
    <div className={styles.product_box}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div className={styles.product_content}>
        {new Array(numberOfProducts).fill(<Product />).map((_, i) => (
          <Product key={i} />
        ))}
      </div>
    </div>
  );
}
