import { firebaseErrorMessages } from '@/lib/firebaseErrorMessages'
import { FirebaseError } from 'firebase/app'

export const handleFirebaseError = (
  error: unknown,
): {
  success: false
  message: string
  code?: string
} => {
  if (error instanceof FirebaseError) {
    const friendlyMessage = firebaseErrorMessages[error.code] || error.message
    return {
      success: false,
      message: friendlyMessage,
      code: error.code,
    }
  }

  return {
    success: false,
    message: 'Something went wrong. Please try again.',
  }
}
