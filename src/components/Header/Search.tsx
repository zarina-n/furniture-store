import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from './Header.module.css'
import { RxCross2, RxMagnifyingGlass } from 'react-icons/rx'

export default function Search() {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [value, setValue] = useState(
    searchParams.get('query')?.toString() || '',
  )

  const onSearchHandle = (e: ChangeEvent<HTMLInputElement>) => {
    // todo: add debounce
    const params = new URLSearchParams(searchParams)
    const searchValue = e.target.value
    setValue(searchValue)

    if (searchValue) {
      params.set('query', searchValue)
    } else {
      params.delete('query')
    }

    router.replace(`${pathName}?${params.toString()}`)
  }

  useEffect(() => {
    setValue('')
  }, [pathName])

  return (
    <div className={styles.navbar_input_wrapper}>
      <input // todo: replace with Input
        placeholder="Search"
        className={styles.navbar_input}
        type="search"
        onChange={onSearchHandle}
        value={value}
      />
      <div className={styles.search_icon}>
        <RxMagnifyingGlass />
      </div>
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue('')
            router.replace(`${pathName}`)
          }}
          className={styles.clear_button}
        >
          <RxCross2 />
        </button>
      )}
    </div>
  )
}
