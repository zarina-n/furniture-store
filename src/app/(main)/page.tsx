import Products from "@/components/Products/Products";
import styles from "./page.module.css";
import Link from "next/link";
import Categories from "@/components/Categories/Categories";

export default function Home() {
  return (
    <main className={styles.home}>
      <Categories />
      <Products heading="Special Offers" />
      <Products heading="Products Catalog" />
      <Link className={styles.catalog_link} href={"/"}>
        Go to Catalog
      </Link>
    </main>
  );
}
