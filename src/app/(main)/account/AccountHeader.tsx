'use client'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import styles from './page.module.css'

export default function AccountHeader() {
  const { user, isLoading } = useKindeBrowserClient()

  return (
    <div>
      {isLoading ? (
        'Loading...' // todo: add loader
      ) : (
        <div className={styles.account}>
          <Image
            className={styles.avatar}
            src={user?.picture}
            width={30}
            height={30}
            alt="Profile Picture"
            unoptimized
          />
          Hello, {user?.given_name || user?.email}!
        </div>
      )}
    </div>
  )
}
