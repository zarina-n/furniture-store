import { firebaseErrorMessages, UNKNOWN_ERROR } from '@/lib/firebaseErrorCodes'
import { FirebaseError } from 'firebase/app'

export function checkErrors(error: unknown) {
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
