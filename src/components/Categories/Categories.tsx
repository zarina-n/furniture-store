import Link from 'next/link'
import styles from './Categories.module.css'
import { categories as categoriesList } from '@/utils/categories'

export default function Categories() {
  return (
    <div className={styles.category_wrapper}>
      <h2 className={styles.heading}>Furniture for ...</h2>
      <div className={styles.category_box}>
        {categoriesList.map((category, index) => (
          <Link
            href={`/catalog/?category=${category.name.toLowerCase()}`}
            key={category.id}
            className={`${styles.category_item} ${
              index < 2 && styles.category_item_large
            }`}
            style={{
              backgroundImage: `url('/assets/images/for_${category.name.toLowerCase()}.jpg')`,
            }}
          >
            <h3 className={styles.category_name}>
              {category.name.toUpperCase()}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
