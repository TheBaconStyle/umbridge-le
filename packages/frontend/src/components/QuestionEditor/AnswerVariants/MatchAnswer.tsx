import { Add, Remove } from "@mui/icons-material"
import { Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

export function MatchAnswer() {
  const { control, watch, register, getValues } = useFormContext()

  const {
    fields: variants,
    append: addVariant,
    remove: removeVariant,
  } = useFieldArray({
    name: "variants",
    control,
  })

  const { append: addAnswer, remove: removeAnswer } = useFieldArray({
    name: "answer",
    control,
  })

  const currentType = watch("type")
  const previousType = getValues("type")

  useEffect(() => {
    if (currentType !== previousType) {
      variants.forEach((_, index) => {
        removeVariant(index)
        removeAnswer(index)
      })
    }
  }, [currentType, removeAnswer, removeVariant, variants, previousType])

  const addMatchPair = () => {
    addAnswer("")
    addVariant("")
  }

  const removeMatchPair = (index: number) => () => {
    removeVariant(index)
    removeAnswer(index)
  }

  if (currentType !== "match") return null

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5.5}>
        <Typography>Вариант</Typography>
      </Grid>
      <Grid item xs={5.5}>
        <Typography>Ответ</Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={addMatchPair} color="primary">
          <Add />
        </IconButton>
      </Grid>
      {variants.map((variant, index) => (
        <Grid
          container
          item
          key={variant.id}
          sx={{ alignItems: "center" }}
          spacing={2}
        >
          <Grid item xs={5.5}>
            <TextField
              {...register(`variants.${index}`)}
              placeholder="Текст варианта"
              fullWidth
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              {...register(`answer.${index}`)}
              placeholder="Текст ответа"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} display="flex" alignItems="center">
            <IconButton color="error" onClick={removeMatchPair(index)}>
              <Remove />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
