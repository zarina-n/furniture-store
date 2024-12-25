import Image from "next/image";
import styles from "./NavBar.module.css";
import Link from "next/link";
import classNames from "classnames";

export default function NavBar() {
  return (
    <div className={classNames(styles.navBar, "center")}>
      <header className={styles.header}>
        <Link href={"/"} className={styles.logo}>
          <Image
            src="/assets/svg/logo.svg"
            width={193}
            height={33}
            alt="logo"
          />
        </Link>
        <input
          placeholder="Search"
          className={styles.header_input}
          type="search"
        />
        <nav className={styles.header_navigation}>
          <Link className={styles.nav_link} href="/catalog">
            Catalog
          </Link>
          <Link className={styles.nav_link} href="/cart">
            Cart
          </Link>
        </nav>
      </header>
      <section className={styles.title_box}>
        <h1 className={styles.title}>Everything your home deserves</h1>
        <p className={styles.title_text}>Our furniture is your reflection</p>
        <Link href="/catalog" className={styles.title_link}>
          Go to Catalog
        </Link>
      </section>
    </div>
  );
}
