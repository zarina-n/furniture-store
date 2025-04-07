'use client'

import Image from 'next/image'
import styles from './ProductPage.module.css'
import cn from 'classnames'
import { useState } from 'react'

export default function ImageCarousel({
  imgSrc,
  name,
}: {
  imgSrc: string[]
  name: string
}) {
  const [images, setImages] = useState<
    { url: string; originalIndex: number }[]
  >(imgSrc.map((url, index) => ({ url, originalIndex: index })))
  const handleImageClick = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages]
      const [clickedImage] = newImages.splice(index, 1)
      newImages.unshift(clickedImage)
      return newImages
    })
  }
  // todo: add placeholder and loading stat
  return (
    <div className={styles.image_grid}>
      {images.map((img, i) => (
        <Image
          src={img.url}
          alt={`Image ${img.originalIndex + 1} of ${name}`}
          width={600}
          height={500}
          key={i}
          className={cn(styles.image, styles[`image_${i + 1}`])}
          onClick={() => handleImageClick(i)}
          unoptimized
        />
      ))}
    </div>
  )
}
