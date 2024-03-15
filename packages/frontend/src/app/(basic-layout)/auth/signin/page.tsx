"use client"

import { Box, Button } from "@mui/material"
import { createUser } from "@web/actions"

export default function SignIn() {
  return (
    <Box>
      <Button
        onClick={() => {
          createUser(
            {
              email: "qwe@qwe.qwe",
              password: "Qw3rty123!",
              firstName: "Иван",
              lastName: "Иванов",
              middleName: "Иванович",
            },
            new Date(),
          ).then(console.log)
        }}
      >
        Create user
      </Button>
    </Box>
  )
}
