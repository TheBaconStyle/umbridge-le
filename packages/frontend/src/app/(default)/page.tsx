"use client"
import { Add, Save } from "@mui/icons-material"
import {
  Autocomplete,
  Box,
  Button,
  List,
  Select,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material"
import type { Question } from "@server/question/entities/question.entity"
import { crtQuestion } from "@web/actions"
import { send } from "@web/actions/send"
import { useState } from "react"
const typeVars = ["match", "multiple", "open", "order", "single"]
export default function Home() {
  const [variants, setVariants] = useState<Question["variants"]>([])
  const [answer, setAnswer] = useState<Question["answer"]>([])
  const [type, setType] = useState<Question["type"]>("match")
  const [text, setText] = useState<string>("")
  return (
    <Box>
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
        }}
      >
        <Typography>Создание вопроса</Typography>
        <Autocomplete
          options={["match", "multiple", "open", "order", "single"]}
          renderInput={(params) => (
            <TextField {...params} label="Тип вопроса" name="type" />
          )}
          value={type}
          onChange={(e, value) => setType(value as Question["type"])}
        />
        <List></List>
        <Button variant="contained" type="button">
          add&nbsp;
          <Add sx={{ fontSize: "20px" }} />
        </Button>
        <Button
          onClick={() => {
            crtQuestion({ type, answer, text, variants })
          }}
        >
          Save&nbsp;
          <Save sx={{ fontSize: "20px" }} />
        </Button>
        {/* <Button component={Link} href="/qwe">
          qwe
        </Button> */}
      </Box>
    </Box>
  )
}
