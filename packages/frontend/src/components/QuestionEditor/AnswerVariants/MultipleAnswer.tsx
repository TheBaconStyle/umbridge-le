import { Add, Remove } from "@mui/icons-material"
import {
  Checkbox,
  Grid,
  IconButton,
  Typography,
  TextField,
} from "@mui/material"
import { ChangeEvent, useEffect } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

export function MultipleAnswer() {
  const { control, watch, register, getValues } = useFormContext()

  const {
    fields: variants,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control, name: "variants" })

  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: "answer",
  })

  const currentType = watch("type")
  const previousType = getValues("type")

  useEffect(() => {
    if (currentType !== previousType) {
      variants.forEach((_, index) => removeVariant(index))
      answers.forEach((_, index) => removeAnswer(index))
    }
  }, [
    previousType,
    currentType,
    variants,
    removeAnswer,
    removeVariant,
    answers,
  ])

  if (currentType !== "multiple") return null

  const addVariant = () => appendVariant("")

  const deleteVariant = (index: number) => () => {
    const answerValues = getValues("answer") as string[]
    const variantValues = getValues("variants") as string[]
    const answerIndex = answerValues.indexOf(variantValues[index])
    if (answerIndex !== -1) removeAnswer(answerIndex)
    removeVariant(index)
  }

  const checkBoxChange =
    (index: number, answerIndex?: number) =>
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked && answerIndex === -1) {
        appendAnswer(variantValues[index])
        return
      }
      if (answerIndex !== -1 && !checked) removeAnswer(answerIndex)
    }

  const answerValues: string[] = watch("answer", [])

  const variantValues: string[] = watch("variants", [])

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={11}>
        <Typography>Варианты ответа</Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={addVariant} color="primary">
          <Add />
        </IconButton>
      </Grid>
      {variants.map((variant, index) => {
        const answerIndex = answerValues.indexOf(variantValues[index])
        return (
          <Grid item container key={variant.id} spacing={2} alignItems="center">
            <Grid item xs={1}>
              <Checkbox
                value={answerIndex !== -1}
                onChange={checkBoxChange(index, answerIndex)}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField {...register(`variants.${index}`)} fullWidth />
            </Grid>
            <Grid item xs={1}>
              <IconButton color="error" onClick={deleteVariant(index)}>
                <Remove />
              </IconButton>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
