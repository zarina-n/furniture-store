'use client'

import cn from 'classnames'
import styles from './page.module.css'
import CartForm from '@/components/CartForm/CartForm'
import CartProduct from '@/components/CartProduct/CartProduct'
import Products from '@/components/Products/Products'
import { Product } from '@/app/types'
import EmptyCart from './EmptyCart'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CartContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<Product[]>([])

  const isCartEmpty = !cartItems.length

  useEffect(() => {
    const productsFromLocalStorage: Product[] = JSON.parse(
      localStorage.getItem('products') || '[]',
    )

    setProducts(productsFromLocalStorage)
  }, [])

  useEffect(() => {
    const productsInCart = products.filter((product) => product.inTheCart)
    setCartItems(productsInCart)
  }, [products])

  const onResetHandle = () => {
    setCartItems([])
  }

  return (
    <div className={styles.cart_wrapper}>
      <div className={cn(styles.cart)}>
        {isCartEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <div className={styles.cart_content}>
              <div className={styles.cart_content_top}>
                <p className={styles.cart_text}>Product</p>
                <p className={styles.cart_text}>Quantity</p>
              </div>
              {cartItems.map(
                ({
                  name,
                  cartImgSrc,
                  description,
                  price,
                  priceBeforeDiscount,
                  id,
                  cartAmount,
                  favorite,
                }) => (
                  <CartProduct
                    key={id}
                    name={name}
                    cartImgSrc={cartImgSrc || ''}
                    description={description}
                    price={price}
                    priceBeforeDiscount={priceBeforeDiscount}
                    id={id}
                    cartAmount={cartAmount}
                    favorite={favorite}
                  />
                ),
              )}
              <div className={styles.cart_button_box}>
                <button
                  className={styles.cart_button}
                  type="reset"
                  onClick={onResetHandle}
                >
                  Empty the cart
                </button>
                <button className={styles.cart_button}>
                  <Link href={'/catalog'}> Continue shopping</Link>
                </button>
              </div>
            </div>
            <CartForm totalAmount={1000} />
          </>
        )}
      </div>
      <div className="center">
        <Products
          heading="Special Offers"
          products={products.filter((product) => product.priceBeforeDiscount)}
        />
      </div>
    </div>
  )
}
