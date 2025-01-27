'use server'

import { z } from 'zod'
import { LoginFormDataSchema, SignupFormDataSchema } from '@/lib/schemas'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { FirebaseError } from 'firebase/app'
import { firebaseErrorMessages, UNKNOWN_ERROR } from '@/lib/firebaseErrorCodes'
import {
  createSessionCookie,
  revokeAllSessions,
} from '@/firebase/firebaseAdmin'
import { cookies } from 'next/headers'
import { SESSION_COOKIE } from '@/lib/constants'

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
    if (error instanceof FirebaseError) {
      const message = firebaseErrorMessages[error.code] || UNKNOWN_ERROR
      return { success: false, error: error.code, message }
    } else {
      return {
        success: false,
        error: 'unknown',
        message: 'Something went wrong.',
      }
    }
  }
}

export async function signUserUp(data: SignupFormValues) {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password) //TODO: add username
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = firebaseErrorMessages[error.code] || UNKNOWN_ERROR
      return { success: false, error: error.code, message }
    } else {
      return {
        success: false,
        error: 'unknown',
        message: 'Something went wrong.',
      }
    }
  }
}

export async function signUserOut() {
  try {
    const nextCookies = await cookies()
    const sessionCookie = nextCookies.get('_session')?.value

    if (!sessionCookie) throw new Error('No active session')

    nextCookies.delete(SESSION_COOKIE)
    await revokeAllSessions(sessionCookie)

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
