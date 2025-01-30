import { type NextRequest, NextResponse } from 'next/server'
import {
  ACCOUNT_URL,
  FAVORITES_ROUTE,
  ROOT_URL,
  SESSION_COOKIE,
} from './lib/constants'

const protectedRoutes = [ACCOUNT_URL, FAVORITES_ROUTE]

export async function middleware(req: NextRequest) {
  const session = req.cookies.get(SESSION_COOKIE)?.value || ''

  if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_URL, req.nextUrl.origin)

    return NextResponse.redirect(absoluteURL.toString())
  }
}
