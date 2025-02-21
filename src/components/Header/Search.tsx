import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ChangeEvent } from 'react'
import styles from './Header.module.css'

export default function Search() {
  // todo: add form and request for a product
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const onSearchHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const searchValue = e.target.value

    if (searchValue) {
      params.set('query', searchValue)
    } else {
      params.delete('query')
    }

    router.replace(`${pathName}?${params.toString()}`)
  }
  return (
    <input // todo: replace with Input
      placeholder="Search"
      className={styles.navbar_input}
      type="search"
      onChange={onSearchHandle}
      defaultValue={searchParams.get('query')?.toString()}
    />
  )
}
