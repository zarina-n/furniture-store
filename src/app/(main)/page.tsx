import Products from "@/components/Products/Products";
import styles from "./page.module.css";
import Link from "next/link";
import Categories from "@/components/Categories/Categories";
import classNames from "classnames";
import { products } from "../mockedData/products";

export default function Home() {
  return (
    <div className={classNames(styles.home, "center")}>
      <Categories />
      <Products
        heading="Special Offers"
        products={products.filter((product) => product.priceBeforeDiscount)}
      />
      <Products
        heading="Products Catalog"
        products={products.filter((product) => !product.priceBeforeDiscount)}
        numberOfProductsToDisplay={6}
      />
      <Link className={styles.catalog_link} href={"/catalog"}>
        Go to Catalog
      </Link>
    </div>
  );
}
