import { Box, Button } from "@mui/material"
import Link from "next/link"

export default function Qwe() {
  return (
    <Box sx={{ p: "1rem" }}>
      <Button LinkComponent={Link} href="/" variant="contained">
        123
      </Button>
    </Box>
  )
}
