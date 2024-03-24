// "use client"
import { Box, Button } from "@mui/material"
import { getPathname } from "@web/actions"
import { NextPage, PageConfig } from "next"

export default async function Home({
  params,
  searchParams,
}: {
  params: Record<string, string>
  searchParams: Record<string, string>
}) {
  const pathname = await getPathname()
  return (
    <Box>
      <Button>sign in</Button>
      {pathname}
    </Box>
  )
}
