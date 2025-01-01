import styles from "./page.module.css";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import FilterBy from "@/components/FilterBy/FilterBy";

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="center">
      <div className={styles.menu}>
        <BreadCrumbs />
        <FilterBy />
        {/*  TODO: add condition if on the product page */}
      </div>
      {children}
    </div>
  );
}
