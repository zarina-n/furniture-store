import Link from "next/link";
import styles from "./BreadCrumbs.module.css";

export default function BreadCrumbs() {
  return (
    <ul className={styles.breadcrumb}>
      <li>
        <Link className={styles.list_link} href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className={styles.list_link} href="/catalog">
          Catalog
        </Link>
      </li>
    </ul>
  );
}
