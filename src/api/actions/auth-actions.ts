'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SESSION_COOKIE } from '@/lib/constants'

export async function createSession(uid: string) {
  const nextjsCookies = await cookies()
  nextjsCookies.set(SESSION_COOKIE, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  redirect('/')
}

export async function removeSession() {
  const nextjsCookies = await cookies()
  nextjsCookies.delete(SESSION_COOKIE)

  redirect('/')
} // todo: remove file
