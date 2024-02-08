"use client"

import { ThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { PropsWithChildren } from "react"

export function NextThemeProvider({
  children,
  ...props
}: PropsWithChildren<ThemeProviderProps>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
