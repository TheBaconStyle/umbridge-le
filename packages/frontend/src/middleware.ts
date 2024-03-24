import { NextRequest, NextResponse } from "next/server"
import { auth } from "./config"

const middleware = auth(async function (request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set("x-pathname", request.url)
  return NextResponse.next({ request: { headers } })
})

export { middleware }
