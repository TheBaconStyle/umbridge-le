"use client"

import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"
import { auth } from "."

export async function AuthProvider({ children }: PropsWithChildren) {
  const session = await auth()
  return <SessionProvider session={session}>{children}</SessionProvider>
}
