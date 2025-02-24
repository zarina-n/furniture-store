'use server'

import db from '@/firebase/firebase'
import { Product } from '@/lib/types'
import { collection, getDocs } from 'firebase/firestore'

export const getProducts = async () => {
  const collectionRef = collection(db, 'products')

  const postCollectionSnapshot = await getDocs(collectionRef)

  const products = postCollectionSnapshot.docs.map((doc) => ({
    ...(doc.data() as Product),
    id: doc.id,
  }))

  return products
}
