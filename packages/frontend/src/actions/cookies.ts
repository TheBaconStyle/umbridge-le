"use server"

import { cookies } from "next/headers"

export async function writeCookies(key: string, value: string) {
  const cookiesStore = cookies()
  cookiesStore.set(key, value)
}

export async function readCookies(key: string, all?: "all") {
  const cookiesStore = cookies()
  return all ? cookiesStore.getAll(key) : cookiesStore.get(key)
}
