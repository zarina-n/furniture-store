import Products from "@/components/Products/Products";
import styles from "./page.module.css";
import Link from "next/link";
import Categories from "@/components/Categories/Categories";
import classNames from "classnames";

export default function Home() {
  return (
    <main className={classNames(styles.home, "center")}>
      <Categories />
      <Products heading="Special Offers" />
      <Products heading="Products Catalog" />
      <Link className={styles.catalog_link} href={"/"}>
        Go to Catalog
      </Link>
    </main>
  );
}
