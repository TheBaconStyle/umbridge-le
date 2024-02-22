"use client"

import { Remove } from "@mui/icons-material"
import { Grid, IconButton, TextField, Typography } from "@mui/material"
import type { Question } from "@server/question/entities/question.entity"
import type { Dispatch, SetStateAction } from "react"

export type TMatchVariants = {
  answer: Question["answer"]
  variants: Question["variants"]
  setAnswer: Dispatch<SetStateAction<Question["answer"]>>
  setVariants: Dispatch<SetStateAction<Question["variants"]>>
}

export function MatchVariants({
  answer,
  setAnswer,
  setVariants,
  variants,
}: TMatchVariants) {
  const removeVariant = (index: number) => () => {
    Array.isArray(variants) &&
      setVariants([...variants.slice(0, index), ...variants.slice(index + 1)])
    Array.isArray(answer) &&
      setAnswer([...answer.slice(0, index), ...answer.slice(index + 1)])
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={5.5}>
        <Typography>Вариант</Typography>
      </Grid>
      <Grid item xs={5.5}>
        <Typography>Ответ</Typography>
      </Grid>
      {Array.isArray(answer) &&
        Array.isArray(variants) &&
        answer.length === variants.length &&
        variants.map((_, index) => {
          return (
            <Grid container item key={index} spacing={2}>
              <Grid item xs={5.5}>
                <TextField
                  fullWidth
                  value={variants[index]}
                  onChange={({ target: { value } }) =>
                    setVariants(variants.with(index, value))
                  }
                />
              </Grid>
              <Grid item xs={5.5}>
                <TextField
                  fullWidth
                  value={answer[index]}
                  onChange={({ target: { value } }) =>
                    setAnswer(answer.with(index, value))
                  }
                />
              </Grid>
              <Grid
                item
                container
                xs={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <IconButton color="error" onClick={removeVariant(index)}>
                  <Remove />
                </IconButton>
              </Grid>
            </Grid>
          )
        })}
    </Grid>
  )
}
