import { addToFavorites, removeFromFavorites } from '@/app/api/actions'
import { FirebaseUser, Product } from '@/lib/types'
import { showToast } from './showToast'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { LOGIN_MODAL } from '@/lib/constants'

interface Props {
  e: React.MouseEvent<SVGElement>
  isAuthenticated: boolean
  firebaseUser: FirebaseUser
  product: Product
  params: URLSearchParams
  router: AppRouterInstance
  pathName: string
}

export const handleFavoriteToggle = async ({
  // todo: fix revalidate path updating
  //todo: fix repeated logic everywhere
  e,
  isAuthenticated,
  firebaseUser,
  product,
  params,
  router,
  pathName,
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
    params.set('showModal', LOGIN_MODAL)
    router.replace(`${pathName}?${params.toString()}`)
  }
}
