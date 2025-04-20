export const EMAIL_ALREADY_EXISTS = 'auth/email-already-exists'
export const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use'
export const INVALID_CREDENTIAL = 'auth/invalid-credential'
export const INVALID_EMAIL = 'auth/invalid-email'
export const INVALID_PASSWORD = 'auth/invalid-password'
export const TOO_MANY_REQUESTS = 'auth/too-many-requests'
export const USER_NOT_FOUND = 'auth/user-not-found'

export const UNKNOWN_ERROR = 'Something went wrong'

export const firebaseErrorMessages: Record<string, string> = {
  // Auth errors
  [EMAIL_ALREADY_EXISTS]: 'An account with this email already exists.',
  [EMAIL_ALREADY_IN_USE]: 'This email is already in use.',
  [INVALID_CREDENTIAL]: 'Email or password is invalid.',
  [INVALID_EMAIL]: 'Please enter a valid email address.',
  [INVALID_PASSWORD]: 'Incorrect password. Please try again.',
  [TOO_MANY_REQUESTS]: 'Too many failed login attempts. Try again later.',
  [USER_NOT_FOUND]: 'No account found with this email.',

  // Firestore/other Firebase errors
  'permission-denied': 'You don’t have permission to do this.',
  'not-found': 'The requested document does not exist.',
  unavailable: 'The server is currently unavailable. Try again later.',
  'deadline-exceeded': 'The request took too long. Please try again.',
  unauthenticated: 'Please log in to perform this action.',
}
