"use client"

import { createTheme } from "@mui/material"
import { Roboto } from "next/font/google"

const RobotoFont = Roboto({
  weight: ["300", "500", "700"],
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  style: ["italic", "normal"],
})

const themeFont = {
  typography: { fontSize: 16, fontFamily: RobotoFont.style.fontFamily },
}

export const lightTheme = createTheme({
  palette: { mode: "light" },
  ...themeFont,
})

export const darkTheme = createTheme({
  palette: { mode: "dark" },
  ...themeFont,
})

export const themes = { light: lightTheme, dark: darkTheme }

export type ThemeVariant = keyof typeof themes
