import { AppBar, Box } from "@mui/material"
import { PropsWithChildren } from "react"

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppBar component="header" position="sticky">
        header
      </AppBar>
      <Box component="main">{children}</Box>
      <AppBar component="footer" position="relative">
        footer
      </AppBar>
    </>
  )
}
