import { addToFavorites, removeFromFavorites } from '@/app/api/actions'
import { FirebaseUser, Product } from '@/lib/types'
import { toast } from 'sonner'

interface Props {
  e: React.MouseEvent<SVGElement>
  isAuthenticated: boolean
  firebaseUser: FirebaseUser
  product: Product
}

export const handleFavoriteToggle = async ({
  e,
  isAuthenticated,
  firebaseUser,
  product,
}: Props) => {
  e.preventDefault()
  if (isAuthenticated && firebaseUser) {
    if (product.favorite) {
      await removeFromFavorites(firebaseUser.id, product.id)
    } else {
      await addToFavorites(firebaseUser.id, product.id)
    }
  } else {
    toast.error('Please sign in to add to favorites') // todo: move to a modal
  }
}
