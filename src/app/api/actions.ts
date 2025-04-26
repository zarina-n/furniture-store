'use server'

import db from '@/firebase/firebase'
import {
  CartItem,
  FirebaseUser,
  FirebaseUserResult,
  Product,
} from '@/lib/types'
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

// todo: check page revalidation

export const getProducts = async () => {
  try {
    const collectionRef = collection(db, 'products')
    const productSnapshot = await getDocs(collectionRef)

    const products = productSnapshot.docs.map((doc) => ({
      ...(doc.data() as Product),
      id: doc.id,
    }))

    const { isAuthenticated } = getKindeServerSession()

    if (await isAuthenticated()) {
      const firebaseUser = await getFirebaseUser()

      if (!firebaseUser || 'success' in firebaseUser) {
        return products
      }

      const favoriteSet = new Set(firebaseUser.favorites ?? [])
      const cartMap = new Map(
        (firebaseUser.cart ?? []).map((item) => [item.id, item]),
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
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch products.',
    }
  }
}

function isFirebaseUser(user: FirebaseUserResult): user is FirebaseUser {
  return user !== null && user !== undefined && 'favorites' in user
}

export const getFavoriteProducts = async () => {
  const user: FirebaseUserResult = await getFirebaseUser()

  if (!isFirebaseUser(user)) {
    return []
  }
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

export const getFirebaseUser = async (): Promise<FirebaseUserResult> => {
  try {
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
    } as FirebaseUser

    await setDoc(userRef, newUser)
    return newUser
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch user data.',
    }
  }
}

export const addToFavorites = async (userId: string, id: string) => {
  try {
    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, {
      favorites: arrayUnion(id),
    })

    revalidatePath('/', 'layout')
    return { success: true, message: 'The item was added to favorites' }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to add to favorites.',
    }
  }
}

export const removeFromFavorites = async (userId: string, id: string) => {
  try {
    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, {
      favorites: arrayRemove(id),
    })

    revalidatePath('/', 'layout')
    return { success: true, message: 'The item was removed from favorites' }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to remove from favorites.',
    }
  }
}

export const addToFireStoreCart = async (userId: string, newItem: CartItem) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return { success: false, message: 'User document not found.' }
    }

    const userData = userSnap.data()
    const cart: CartItem[] = userData.cart || []

    const itemExists = cart.some((cartItem) => cartItem.id === newItem.id)

    const updatedCart = itemExists
      ? cart.filter((cartItem) => cartItem.id !== newItem.id)
      : [...cart, { ...newItem, amount: 1, price: newItem.price }]

    await updateDoc(userRef, { cart: updatedCart })
    revalidatePath('/', 'layout')

    const message = itemExists
      ? 'The item was removed from the cart'
      : 'The item was added to the cart'

    return { success: true, message }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to update cart in Firestore.',
    }
  }
}

export const updateCartItemAmount = async (
  userId: string,
  newItem: CartItem,
) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return { success: false, message: 'User document not found.' }
    }

    const userData = userSnap.data()
    const cart: CartItem[] = userData.cart || []

    const cartItemIndex = cart.findIndex((item) => item.id === newItem.id)

    if (cartItemIndex !== -1) {
      cart[cartItemIndex].amount = newItem.amount
      await updateDoc(userRef, { cart })

      revalidatePath('/', 'layout')
      return { success: true, message: 'Item amount was updated' }
    }

    return { success: false, message: 'Item not found in cart.' }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to update cart item amount.',
    }
  }
}

export const addOrUpdateCartItem = async (
  userId: string,
  item: { id: string; amount: number; price: number },
) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return { success: false, message: 'User not found.' }
    }

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

    const message =
      existingItemIndex !== -1
        ? 'The item amount was updated'
        : 'The item was added to the cart'

    await updateDoc(userRef, { cart })
    revalidatePath('/', 'layout')

    return { success: true, message }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to add or update cart item.',
    }
  }
}

export const removeAllFromCart = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, { cart: [] })

    revalidatePath('/', 'layout')
    return { success: true, message: 'The cart is empty' }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to clear the cart.',
    }
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
  // is needed for manually updating database with products
  productId: string,
  newData: Product,
) => {
  const productsRef = doc(db, 'products', productId)

  try {
    const productSnap = await getDoc(productsRef)

    if (!productSnap.exists()) {
      return { success: false, message: 'Product not found.' }
    }

    await updateDoc(productsRef, newData)
    return { success: true, message: 'Product is  updated' }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update product.',
    }
  }
}
