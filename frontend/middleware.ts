import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  // Lista de rutas privadas que requieren autenticación
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
  ]

  // Si la URL empieza con alguna de las rutas privadas
  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      // Redirigir a login si no hay sesión
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
  }

  return NextResponse.next()
}

// Next.js necesita saber qué rutas pasarán por el middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
}
