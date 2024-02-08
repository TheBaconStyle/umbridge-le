"use server"

import { cookies } from "next/headers"

export async function getTheme() {
  const reqCookies = cookies()
  return reqCookies.get("app-theme")?.value
}
