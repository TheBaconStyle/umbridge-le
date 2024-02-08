import { NextRequest, NextResponse } from "next/server"

async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const headers = new Headers(request.headers)
  headers.set("x-pathname", pathname)
  return NextResponse.next({ request: { headers } })
}

export { middleware }
