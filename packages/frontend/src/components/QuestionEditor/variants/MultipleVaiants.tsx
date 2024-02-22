"use client"

import { Remove } from "@mui/icons-material"
import {
  Checkbox,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material"
import type { Question } from "@server/question/entities/question.entity"
import type { Dispatch, SetStateAction } from "react"

export type TMultipleVariants = {
  answer: Question["answer"]
  variants: Question["variants"]
  setAnswer: Dispatch<SetStateAction<Question["answer"]>>
  setVariants: Dispatch<SetStateAction<Question["variants"]>>
}

export function MultipleVariants({
  answer,
  setAnswer,
  setVariants,
  variants,
}: TMultipleVariants) {
  const removeVariant = (index: number) => () => {
    if (Array.isArray(answer) && Array.isArray(variants)) {
      const answ = new Set(answer)
      if (answ.delete(variants[index])) setAnswer(Array.from(answ))
      setVariants([...variants.slice(0, index), ...variants.slice(index + 1)])
    }
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>Варианты ответа</Typography>
      </Grid>
      {Array.isArray(variants) &&
        variants.map((_, index) => (
          <Grid item key={index} display="flex" gap={2} alignItems="center">
            <Checkbox
              onChange={(_, checked) => {
                const newAnswer = new Set(answer)
                if (checked && !newAnswer.has(variants[index])) {
                  newAnswer.add(variants[index])
                }
                if (!checked && newAnswer.has(variants[index])) {
                  newAnswer.delete(variants[index])
                }
                setAnswer(Array.from(newAnswer))
              }}
              checked={answer.includes(variants[index])}
            />

            <TextField
              fullWidth
              label="Текст варианта"
              value={variants[index]}
              onChange={({ target: { value } }) => {
                const newAnswer = new Set(answer)
                newAnswer.delete(variants[index])
                setAnswer(Array.from(newAnswer))
                setVariants(variants.with(index, value))
              }}
            />

            <IconButton color="error" onClick={removeVariant(index)}>
              <Remove />
            </IconButton>
          </Grid>
        ))}
    </Grid>
  )
}
