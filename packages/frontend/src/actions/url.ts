"use server"

import { headers } from "next/headers"

export async function getFullUrl() {
  const reqHeaders = headers()
  return reqHeaders.get("x-pathname")
}

export async function getPathname() {
  const url = await getFullUrl()
  if (!url) return "/"
  return new URL(url).pathname
}

export async function getSearchParams() {
  const url = await getFullUrl()
  return new URL(url ?? "").searchParams
}
