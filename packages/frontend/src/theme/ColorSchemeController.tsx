"use client"

import { setTheme } from "@web/actions"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export type TColorSchemeController = {
  currentTheme?: string
}

export function ColorSchemeController({
  currentTheme,
}: TColorSchemeController) {
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    ;(async () => {
      if (
        resolvedTheme &&
        resolvedTheme !== "system" &&
        resolvedTheme !== currentTheme
      )
        setTheme(resolvedTheme)
    })()
  }, [resolvedTheme, currentTheme])
  return null
}
