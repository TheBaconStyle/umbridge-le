"use server"
import { ThemeVariant } from "@web/theme"
import { cookies } from "next/headers"

export async function setTheme(theme: ThemeVariant) {
  const userCookies = cookies()
  userCookies.set("app-theme", theme)
  console.log(userCookies.get("app-theme"))
  return "qwe"
}
