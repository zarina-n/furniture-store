'use server'

import db from '@/firebase/firebase'
import { CartItem, FirebaseUser, Product } from '@/lib/types'
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'

// todo: handle all errors

export const getProducts = async () => {
  const collectionRef = collection(db, 'products')
  const productSnapshot = await getDocs(collectionRef)

  const products = productSnapshot.docs.map((doc) => ({
    ...(doc.data() as Product),
    id: doc.id,
  }))

  const { isAuthenticated } = getKindeServerSession()

  if (await isAuthenticated()) {
    const firebaseUser = await getFirebaseUser()

    const favoriteProductsIds = firebaseUser?.favorites ?? []

    return products.map((product) => ({
      ...product,
      favorite: favoriteProductsIds.includes(product.id),
    }))
  }

  return products.map((product) => ({ ...product, favorite: false }))
}

export const getFirebaseUser = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()

  if (!(await isAuthenticated())) return null
  const kindeUser = await getUser()

  const userRef = doc(db, 'users', kindeUser.id)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    console.log(userSnap.data())
    return { ...userSnap.data(), id: kindeUser.id } as FirebaseUser
  }

  const newUser = {
    name: kindeUser.given_name,
    email: kindeUser.email,
    cart: [],
    favorites: [],
    id: kindeUser.id,
  }

  await setDoc(userRef, newUser)

  return newUser
}

export const addToFavorites = async (userId: string, itemId: string) => {
  const userRef = doc(db, 'users', userId)

  await updateDoc(userRef, {
    favorites: arrayUnion(itemId),
  })

  revalidatePath('/', 'layout') // todo: add loader to the icon and errors check
}

export const removeFromFavorites = async (userId: string, itemId: string) => {
  const userRef = doc(db, 'users', userId)

  await updateDoc(userRef, {
    favorites: arrayRemove(itemId),
  })

  revalidatePath('/', 'layout')
}

export const addToFireStoreCart = async (userId: string, newItem: CartItem) => {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) return

  const userData = userSnap.data()
  const cart: CartItem[] = userData.cart || []

  const itemExists = cart.some((cartItem) => cartItem.itemId === newItem.itemId)

  const updatedCart = itemExists
    ? cart.filter((cartItem) => cartItem.itemId !== newItem.itemId)
    : [...cart, { ...newItem, amount: 1, price: newItem.price }]

  await updateDoc(userRef, { cart: updatedCart })

  revalidatePath('/', 'layout')
}

export const updateCartItemAmount = async (
  userId: string,
  newItem: CartItem,
) => {
  const userRef = doc(db, 'users', userId)

  try {
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      throw new Error('User document not found')
    }

    const userData = userSnap.data()
    const cart: CartItem[] = userData.cart || []

    const cartItemIndex = cart.findIndex(
      (item) => item.itemId === newItem.itemId,
    )

    if (cartItemIndex !== -1) {
      cart[cartItemIndex].amount = newItem.amount
      await updateDoc(userRef, { cart })
    } else {
      console.warn('Item not found in cart')
    }

    revalidatePath('/', 'layout')
  } catch (error) {
    console.error('Error updating cart item amount:', error)
  }
}

export const removeAllFromCart = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, { cart: [] }) // todo: refactor

    revalidatePath('/', 'layout')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error clearing cart:', error) // todo: refactor
  }
}

export const getProduct = async (productId: string) => {
  const productsRef = doc(db, 'products', productId)
  const product = (await getDoc(productsRef)).data()

  return product
}

export const updateProductOnce = async (
  productId: string,
  newData: Product,
) => {
  const productsRef = doc(db, 'products', productId)

  try {
    const productSnap = await getDoc(productsRef)

    if (!productSnap.exists()) {
      console.error('Product not found')
      return
    }

    await updateDoc(productsRef, newData)
    console.log('Product updated successfully')
  } catch (error) {
    console.error('Error updating product:', error)
  }
}
