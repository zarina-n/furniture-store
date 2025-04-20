import { addToFavorites, removeFromFavorites } from '@/app/api/actions'
import { FirebaseUser, Product } from '@/lib/types'
import { toast } from 'sonner'
import { showToast } from './showToast'

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
      // todo: fix icon color change
      const result = await removeFromFavorites(firebaseUser.id, product.id)
      showToast(result)
    } else {
      const result = await addToFavorites(firebaseUser.id, product.id)
      showToast(result)
    }
  } else {
    toast.error('Please sign in to add to favorites') // todo: move to a modal
  }
}
