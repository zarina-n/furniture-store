'use server'

import { z } from 'zod'
import { LoginFormDataSchema, SignupFormDataSchema } from '@/lib/schemas'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import {
  adminAuth,
  createSessionCookie,
  revokeAllSessions,
} from '@/firebase/firebaseAdmin'
import { cookies } from 'next/headers'
import { SESSION_COOKIE } from '@/lib/constants'
import { revalidatePath } from 'next/cache'
import { checkErrors } from './errors-check'

type LoginFormValues = z.infer<typeof LoginFormDataSchema>
type SignupFormValues = z.infer<typeof SignupFormDataSchema>

export async function loginUser(data: LoginFormValues) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    )

    const idToken = await userCredential.user.getIdToken()
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

    const sessionCookie = await createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    })

    const nextCookies = await cookies()
    nextCookies.set(SESSION_COOKIE, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    })

    return { success: true }
  } catch (error) {
    checkErrors(error)
  }
}

export async function signUserUp(data: SignupFormValues) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    )

    if (userCredential.user) {
      await changeUserName(userCredential.user.uid, data.username)
    }

    const idToken = await userCredential.user.getIdToken()
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

    const sessionCookie = await createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    })

    const nextCookies = await cookies()
    nextCookies.set(SESSION_COOKIE, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    })

    return { success: true }
  } catch (error: unknown) {
    checkErrors(error)
  }
}

export async function signUserOut(uid: string) {
  try {
    await signOut(auth)
    await adminAuth.revokeRefreshTokens(uid)

    const nextCookies = await cookies()
    const sessionCookie = nextCookies.get('_session')?.value

    if (!sessionCookie) {
      return { success: false, error: 'No active session' }
    }

    await revokeAllSessions(sessionCookie)
    nextCookies.delete('_session')
    revalidatePath('/', 'page')
    return { success: true }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error signing user out:', error)
    return { success: false, error }
  }
}

export async function changeUserName(uid: string, userName: string) {
  try {
    await adminAuth.updateUser(uid, {
      displayName: userName,
    })

    return { success: true }
  } catch (error: unknown) {
    checkErrors(error)
  }
}

export async function changeUserEmail(uid: string, email: string) {
  try {
    await adminAuth.updateUser(uid, {
      email: email || undefined,
    })

    return { success: true }
  } catch (error: unknown) {
    checkErrors(error)
  }
}

export async function changeUserPassword(uid: string, password: string) {
  try {
    await adminAuth.updateUser(uid, { password })

    return { success: true }
  } catch (error) {
    checkErrors(error)
  }
}

export async function sendResetPasswordLink(email: string) {
  // todo: add forgot password link
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    checkErrors(error)
  }
}
