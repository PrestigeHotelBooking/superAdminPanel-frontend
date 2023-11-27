// authMiddleware.ts
import { NextRequest } from 'next/server'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export type userAuthT = { status: number; headers: { location: string } }
type AuthMiddlewareResult = NextRequest | userAuthT | null

export function authMiddleware(request: NextRequest): AuthMiddlewareResult {
  const pathname = request.url
  const userToken = Cookies.get('x-access-token')

  if (userToken) {
    const decoded = jwtDecode(userToken) as { exp: number }
    const currentTimeInSeconds = Math.floor(Date.now() / 1000)

    if (decoded.exp && decoded.exp < currentTimeInSeconds) {
      return {
        status: 302,
        headers: {
          location: '/signin',
        },
      }
    } else if (pathname === '/dashboard') {
      return request
    } else {
      return {
        status: 302,
        headers: {
          location: '/signin',
        },
      }
    }
  } else {
    return request
  }
}
