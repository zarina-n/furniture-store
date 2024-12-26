import Products from "@/components/Products/Products";
import styles from "./page.module.css";
import Link from "next/link";
import Categories from "@/components/Categories/Categories";
import classNames from "classnames";

export default function Home() {
  return (
    <div className={classNames(styles.home, "center")}>
      <Categories />
      <Products heading="Special Offers" numberOfProducts={3} />
      <Products heading="Products Catalog" numberOfProducts={6} />
      <Link className={styles.catalog_link} href={"/"}>
        Go to Catalog
      </Link>
    </div>
  );
}
