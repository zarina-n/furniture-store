import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'
import classNames from 'classnames'

export default function Footer() {
  return (
    <footer className={classNames(styles.footer, 'center')}>
      <Link href={'/'} className="logo">
        <Image src="/assets/svg/logo.svg" width={193} height={33} alt="logo" />
      </Link>
      <div className={styles.footer_content}>
        <div className={styles.footer_info}>
          <nav className={styles.footer_item}>
            <h4 className={styles.footer_heading}>Menu</h4>
            <Link href={'/'} className={styles.footer_link}>
              Main
            </Link>
            <Link href={'/catalog'} className={styles.footer_link}>
              Catalog
            </Link>
            <Link href={'/cart'} className={styles.footer_link}>
              Cart
            </Link>
          </nav>
          <div className={styles.footer_item}>
            <h4 className={styles.footer_heading}>Contacts</h4>
            <Link className={styles.footer_link} href="tel:+79088008080 ">
              +7 908 800 80 80
            </Link>
            <Link
              className={styles.footer_link}
              href="mailto:help@interier.com"
            >
              help@interier.com
            </Link>
            <div className={styles.footer_icons}>
              <Link href={'/'}>
                <Image
                  src="/assets/svg/instagram.svg"
                  width={25}
                  height={24}
                  alt="instagram"
                />
              </Link>
              <Link href={'/'}>
                <Image
                  src="/assets/svg/twitter.svg"
                  width={25}
                  height={24}
                  alt="twitter"
                />
              </Link>
              <Link href={'/'}>
                <Image
                  src="/assets/svg/facebook.svg"
                  width={25}
                  height={24}
                  alt="facebook"
                />
              </Link>
            </div>
          </div>
        </div>
        <form className={styles.footer_form} action="#">
          <label className={styles.footer_text} htmlFor="email">
            Receive our news and updates
          </label>
          <input
            id="email"
            placeholder="Email Address"
            className={styles.email}
            type="email"
          />
          <button className={styles.email_button}>Subscribe</button>
        </form>
      </div>
    </footer>
  )
}
