import { cookies } from 'next/headers'
import { SessionCookieOptions } from 'firebase-admin/auth'
import admin from 'firebase-admin'
import { SESSION_COOKIE } from '@/lib/constants'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export const adminAuth = admin.auth()

export async function isUserAuthenticated(
  session: string | undefined = undefined,
) {
  const _session = session ?? (await getSession())
  if (!_session) return false

  try {
    const isRevoked = !(await adminAuth.verifySessionCookie(_session, true))
    return !isRevoked
  } catch (error) {
    console.log(error) // todo: add error popup
    return false
  }
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!(await isUserAuthenticated(session))) {
    return null
  }

  const decodedIdToken = await adminAuth.verifySessionCookie(session!)
  const currentUser = await adminAuth.getUser(decodedIdToken.uid)
  return currentUser
}

async function getSession() {
  try {
    return (await cookies()).get(SESSION_COOKIE)?.value
  } catch (error) {
    console.log('error', error) // todo: add error popup
    return undefined
  }
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions,
) {
  try {
    return await adminAuth.createSessionCookie(idToken, sessionCookieOptions)
  } catch (error) {
    throw error
  }
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await adminAuth.verifySessionCookie(session)

  return await adminAuth.revokeRefreshTokens(decodedIdToken.sub)
}
