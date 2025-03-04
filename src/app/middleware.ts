import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // You can implement more sophisticated auth checking here
  // For now, this is a simple example that doesn't actually check auth status

  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/signup"

  // Check for auth cookie/token (this is a placeholder)
  // In a real app, you'd verify the token
  const isAuthenticated = request.cookies.has("authenticated")

  // Redirect logic
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !isAuthenticated && path !== "/") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}