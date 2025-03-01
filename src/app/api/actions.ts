'use server'

import db from '@/firebase/firebase'
import { FirebaseUser, Product } from '@/lib/types'
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

export const getProducts = async () => {
  const collectionRef = collection(db, 'products')

  const postCollectionSnapshot = await getDocs(collectionRef)

  const products = postCollectionSnapshot.docs.map((doc) => ({
    ...(doc.data() as Product),
    id: doc.id,
  }))

  const { isAuthenticated } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()

  if (isUserAuthenticated) {
    const firebaseUser = await getFirebaseUser()

    const favoriteProductsIds: string[] = firebaseUser?.favorites ?? []

    const processedProducts = products.map((product) => {
      const isFavorite = favoriteProductsIds.find((id) => product.id === id)

      if (isFavorite) return { ...product, favorite: true }

      return product
    })

    return processedProducts
  }

  return products
}

export const getFirebaseUser = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()
  const kindeUser = await getUser()

  let firebaseUser

  if (isUserAuthenticated) {
    const user = await getDoc(doc(db, 'users', kindeUser.id))

    if (user.exists()) {
      firebaseUser = { ...user.data(), id: kindeUser.id } as FirebaseUser
    } else {
      await setDoc(doc(db, 'users', kindeUser.id), {
        name: kindeUser.given_name,
        email: kindeUser.email,
        cart: [],
        favorites: [],
        id: kindeUser.id,
      })
    }
  }

  return firebaseUser
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

export const addToCart = async (
  userId: string,
  newItem: { itemId: string; amount: number },
  itemId: string,
) => {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(doc(db, 'users', userId))

  if (userSnap.exists()) {
    const userData = userSnap.data()
    const cart = userData.cart || []

    const cartItem = cart.filter(
      (item: { itemId: string }) => item?.itemId === newItem?.itemId, // todo: rename
    )

    if (cartItem.length) {
      await updateDoc(userRef, {
        cart: arrayRemove(newItem),
      })
    } else {
      await updateDoc(userRef, {
        cart: arrayUnion({ itemId, amount: 1 }),
      })
    }

    revalidatePath('/', 'layout')
  }
}

export const removeAllFromCart = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, { cart: [] }) // todo: refactor

    revalidatePath('/', 'layout')
  } catch (error) {
    console.error('Error clearing cart:', error)
  }
}
