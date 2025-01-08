'use client'

import styles from './Header.module.css'
import Link from 'next/link'

interface Props {
  title: string
  titleDescription?: string
}

export default function Title({ title, titleDescription }: Props) {
  return (
    <section className={styles.title_box}>
      <h1 className={styles.title}>{title}</h1>
      {titleDescription && (
        <>
          <p className={styles.title_text}>{titleDescription}</p>
          <Link href="/catalog" className={styles.title_link}>
            Go to Catalog
          </Link>
        </>
      )}
    </section>
  )
}
