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

type LoginFormValues = z.infer<typeof LoginFormDataSchema>
type SignupFormValues = z.infer<typeof SignupFormDataSchema>

export async function loginUser(data: LoginFormValues) {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password)
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

export async function signupUser(data: SignupFormValues) {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
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
