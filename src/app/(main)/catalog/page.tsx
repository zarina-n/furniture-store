import Products from "@/components/Products/Products";
import styles from "./page.module.css";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import FilterBy from "@/components/FilterBy/FilterBy";

export default function Catalog() {
  return (
    <div className="center">
      <div className={styles.menu}>
        <BreadCrumbs />
        <FilterBy />
      </div>
      <Products numberOfProducts={9} />
    </div>
  );
}
