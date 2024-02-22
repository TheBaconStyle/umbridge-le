"use client"

import { Add, Remove } from "@mui/icons-material"
import { Grid, IconButton, TextField, Typography } from "@mui/material"
import { Reorder } from "framer-motion"
import { Dispatch, SetStateAction, useState } from "react"

export type TOrderVariants = {
  answer: string[]
  setAnswer: Dispatch<SetStateAction<string[]>>
}

export function OrderVariants({ answer, setAnswer }: TOrderVariants) {
  const [varText, setVarText] = useState("")
  const addVariant = () => {
    setAnswer([...answer, varText])
    setVarText("")
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>Добавить вариант</Grid>
      <Grid item display="flex" alignItems="center">
        <TextField
          onChange={({ target: { value } }) => setVarText(value)}
          fullWidth
          label="Текст варианта"
          value={varText}
          onKeyUp={(e) => e.key === "Enter" && addVariant()}
        />
        <IconButton color="primary" onClick={addVariant}>
          <Add />
        </IconButton>
      </Grid>
      <Grid item>Варианты ответа (расставить по порядку сверху вниз)</Grid>
      <Reorder.Group
        style={{ paddingLeft: 16, listStyle: "none" }}
        values={answer}
        onReorder={setAnswer}
      >
        {answer.map((answ, index) => (
          <Grid
            component={Reorder.Item}
            value={answ}
            key={answ}
            item
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Typography>{answ}</Typography>
            <IconButton
              color="error"
              sx={{ ml: "auto" }}
              onClick={() =>
                setAnswer([
                  ...answer.slice(0, index),
                  ...answer.slice(index + 1),
                ])
              }
            >
              <Remove />
            </IconButton>
          </Grid>
        ))}
      </Reorder.Group>
    </Grid>
  )
}
