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
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'
import { chunkArray } from '@/utils/chunkArray'

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

    const favoriteSet = new Set(firebaseUser?.favorites ?? [])
    const cartMap = new Map(
      (firebaseUser?.cart ?? []).map((item) => [item.id, item]),
    )

    return products.map((product) => {
      const cartItem = cartMap.get(product.id)

      return {
        ...product,
        favorite: favoriteSet.has(product.id),
        inTheCart: !!cartItem,
        amount: cartItem?.amount ?? 0,
        cartPrice: cartItem?.price ?? null,
      }
    })
  }

  return products.map((product) => ({
    ...product,
    favorite: false,
    inTheCart: false,
    amount: 0,
    cartPrice: null,
  }))
}

export const getFirebaseUser = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()

  if (!(await isAuthenticated())) return null
  const kindeUser = await getUser()

  const userRef = doc(db, 'users', kindeUser.id)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return {
      ...userSnap.data(),
      id: kindeUser.id,
      favorites: userSnap.data()?.favorites ?? [],
      cart: userSnap.data()?.cart ?? [],
    } as FirebaseUser
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

export const getFavoriteProducts = async () => {
  const user = await getFirebaseUser()
  const favoriteIds = user?.favorites ?? []

  if (!favoriteIds.length) return []

  const chunks = chunkArray(favoriteIds, 10) // firestore where('in), [...] can only only handle 10 items max

  const productDocs = await Promise.all(
    chunks.map((chunk) =>
      getDocs(query(collection(db, 'products'), where('id', 'in', chunk))),
    ),
  )

  return productDocs
    .flatMap((snap) => snap.docs)
    .map((doc) => ({
      ...(doc.data() as Product),
      id: doc.id,
      favorite: true,
    }))
}

export const addToFavorites = async (userId: string, id: string) => {
  const userRef = doc(db, 'users', userId)

  await updateDoc(userRef, {
    favorites: arrayUnion(id),
  })

  revalidatePath('/', 'layout') // todo: add loader to the icon and errors check
}

export const removeFromFavorites = async (userId: string, id: string) => {
  const userRef = doc(db, 'users', userId)

  await updateDoc(userRef, {
    favorites: arrayRemove(id),
  })

  revalidatePath('/', 'layout')
}

export const addToFireStoreCart = async (userId: string, newItem: CartItem) => {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) return

  const userData = userSnap.data()
  const cart: CartItem[] = userData.cart || []

  const itemExists = cart.some((cartItem) => cartItem.id === newItem.id)

  const updatedCart = itemExists
    ? cart.filter((cartItem) => cartItem.id !== newItem.id)
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

    const cartItemIndex = cart.findIndex((item) => item.id === newItem.id)

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

export const addOrUpdateCartItem = async (
  userId: string,
  item: { id: string; amount: number; price: number },
) => {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) return

  const userData = userSnap.data()
  const cart: CartItem[] = userData.cart || []

  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id,
  )

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].amount = item.amount
  } else {
    cart.push({ ...item })
  }

  await updateDoc(userRef, { cart })
  revalidatePath('/', 'layout')
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
  const productRef = doc(db, 'products', productId)
  const productSnap = await getDoc(productRef)

  if (!productSnap.exists()) return null

  const product = {
    ...(productSnap.data() as Product),
    id: productSnap.id,
  }

  const { isAuthenticated } = getKindeServerSession()

  if (await isAuthenticated()) {
    const user = (await getFirebaseUser()) as FirebaseUser
    const isFavorite = user?.favorites.includes(productId) ?? false
    const cartItem = user?.cart.find((item) => item.id === productId)
    const amount = cartItem?.amount ?? 1

    return {
      ...product,
      favorite: isFavorite,
      amount,
    }
  }

  return {
    ...product,
    favorite: false,
    amount: 0,
  }
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
  } catch (error) {
    console.error('Error updating product:', error)
  }
}
