'use client'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import styles from './page.module.css'
import { FaRegCircleUser } from 'react-icons/fa6'

export default function AccountHeader() {
  const { user, isLoading } = useKindeBrowserClient() // todo: replace with user provider

  return (
    <div>
      {isLoading ? (
        'Loading...' // todo: add loader
      ) : (
        <div className={styles.account}>
          {user.picture ? (
            <Image
              className={styles.avatar}
              src={user?.picture}
              width={40}
              height={40}
              alt="Profile Picture"
              unoptimized
            />
          ) : (
            <FaRegCircleUser />
          )}
          Hello, {user?.given_name || user?.email}!
        </div>
      )}
    </div>
  )
}
