import { Remove } from "@mui/icons-material"
import {
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  IconButton,
} from "@mui/material"
import type { Question } from "@server/question/entities/question.entity"
import type { Dispatch, SetStateAction } from "react"

export type TSingleVariants = {
  answer: Question["answer"]
  variants: Question["variants"]
  setAnswer: Dispatch<SetStateAction<Question["answer"]>>
  setVariants: Dispatch<SetStateAction<Question["variants"]>>
}

export function SingleVariants({
  answer,
  setAnswer,
  setVariants,
  variants,
}: TSingleVariants) {
  const removeVariant = (index: number) => () => {
    if (Array.isArray(variants)) {
      !Array.isArray(answer) && answer === variants[index] && setAnswer("")
      setVariants([...variants.slice(0, index), ...variants.slice(index + 1)])
    }
  }

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component={RadioGroup}
      value={answer}
      onChange={(_, value) => {
        if (value !== "") setAnswer(value)
      }}
    >
      <Grid item>
        <Typography>Варианты ответа</Typography>
      </Grid>

      {Array.isArray(variants) &&
        variants.map((_, index) => (
          <Grid item key={index} display="flex" gap={2} alignItems="center">
            <Radio value={variants[index]} />
            <TextField
              fullWidth
              label="Текст варианта"
              value={variants[index]}
              onChange={({ target: { value } }) => {
                if (answer) setAnswer(String(undefined))
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
