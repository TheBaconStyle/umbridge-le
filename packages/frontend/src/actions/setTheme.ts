"use server"

import { cookies } from "next/headers"

export async function setTheme(theme: string) {
  const userCookies = cookies()
  userCookies.set("app-theme", theme)
}
