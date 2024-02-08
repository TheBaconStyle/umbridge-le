import { AppBar, PaletteMode, Toolbar, Typography } from "@mui/material"
import { getTheme } from "@web/actions"
import Link from "next/link"
import { ThemeSwitch } from "./ThemeSwitch"

export async function Header() {
  const currentTheme = await getTheme()

  return (
    <AppBar component="header" position="sticky">
      <Toolbar>
        <Typography
          variant="h5"
          component={Link}
          href="/"
          sx={{ color: "inherit", textDecoration: "none", mr: "auto" }}
        >
          {Header.name}
        </Typography>
        <ThemeSwitch currentTheme={currentTheme as PaletteMode} />
      </Toolbar>
    </AppBar>
  )
}
