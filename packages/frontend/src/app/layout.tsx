import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { getTheme } from "@web/actions"
import { NotificationProvider } from "@web/components"
import {
  ColorSchemeController,
  NextThemeProvider,
  darkTheme,
  lightTheme,
} from "@web/theme"
import type { Metadata } from "next"
import { PropsWithChildren } from "react"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const userTheme = await getTheme()
  return (
    <html lang="ru" suppressHydrationWarning>
      <AppRouterCacheProvider options={{ key: "css", prepend: true }}>
        <ThemeProvider theme={userTheme === "dark" ? darkTheme : lightTheme}>
          <Box
            component="body"
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <NotificationProvider>
              <NextThemeProvider enableSystem>
                <ColorSchemeController currentTheme={userTheme} />
                {children}
              </NextThemeProvider>
            </NotificationProvider>
          </Box>

          <CssBaseline />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  )
}
