export const EMAIL_ALREADY_EXISTS = 'auth/email-already-exists'
export const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use'
export const INVALID_CREDENTIAL = 'auth/invalid-credential'
export const INVALID_EMAIL = 'auth/invalid-email'
export const INVALID_PASSWORD = 'auth/invalid-password'
export const TOO_MANY_REQUESTS = 'auth/too-many-requests'
export const USER_NOT_FOUND = 'auth/user-not-found'
export const SESSION_COOKIE_REVOKED = 'auth/session-cookie-revoked'

export const UNKNOWN_ERROR = 'Something went wrong'

export const firebaseErrorMessages: Record<string, string> = {
  [USER_NOT_FOUND]: 'No account found with this email.',
  [INVALID_CREDENTIAL]: 'Email or password is invalid.',
  [INVALID_PASSWORD]: 'Incorrect password. Please try again.',
  [TOO_MANY_REQUESTS]: 'Too many failed login attempts. Try again later.',
  [EMAIL_ALREADY_IN_USE]: 'This email already exists',
  [SESSION_COOKIE_REVOKED]: 'The Firebase session cookie has been revoked.',
}
