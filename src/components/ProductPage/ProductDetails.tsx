'use client'

import { Product } from '@/lib/types'
import { JSX, useState } from 'react'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import styles from './ProductPage.module.css'

function ToggleSection({
  title,
  content,
  isOpen,
  toggle,
  renderContent,
}: {
  title: string
  content: string[]
  isOpen: boolean
  toggle: () => void
  renderContent: (content: string[]) => JSX.Element[]
}) {
  return (
    <div>
      <button className={styles.description} onClick={toggle}>
        <h4 className={styles.title}>{title}</h4>
        {isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
      </button>
      {isOpen && renderContent(content)}
    </div>
  )
}

export default function ProductDetails({ product }: { product: Product }) {
  const [showDescription, setShowDescription] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  // todo: add animation
  return (
    <div className={styles.details}>
      <ToggleSection
        title="Description"
        content={product.longDescription}
        isOpen={showDescription}
        toggle={() => setShowDescription((prev) => !prev)}
        renderContent={(content) =>
          content.map((item, index) => (
            <p key={index} className={styles.description_text}>
              {item}
            </p>
          ))
        }
      />

      <ToggleSection
        title="Product Highlights"
        content={product.productHighlights}
        isOpen={showDetails}
        toggle={() => setShowDetails((prev) => !prev)}
        renderContent={(content) =>
          content.map((item, index) => (
            <li key={index} className={styles.description_text}>
              {item}
            </li>
          ))
        }
      />
    </div>
  )
}
