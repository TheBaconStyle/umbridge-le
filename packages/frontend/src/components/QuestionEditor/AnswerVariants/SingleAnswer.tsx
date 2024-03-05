import { Add, Remove } from "@mui/icons-material"
import {
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"
import { useFieldArray, useFormContext } from "react-hook-form"

export function SingleAnswer() {
  const { register, watch, control, setValue } = useFormContext()
  const {
    fields: variants,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  })
  const currentType = watch("type")

  if (currentType !== "single") return null

  const answer = watch("answer", "")

  const variantValues = watch("variants")

  const addVariant = () => appendVariant("")

  const deleteVariant = (index: number) => () => {
    if (variantValues.includes(answer)) {
      setValue("answer", "")
    }
    removeVariant(index)
  }

  const changeAnswer = (_: unknown, value: string) => setValue("answer", value)

  return (
    <Grid
      container
      spacing={2}
      component={RadioGroup}
      alignItems="center"
      value={answer}
      onChange={changeAnswer}
    >
      <Grid item xs={11}>
        <Typography>Варианты ответа</Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton color="primary" onClick={addVariant}>
          <Add />
        </IconButton>
      </Grid>

      {variants.length > 0 &&
        variants.map((variant, index) => (
          <Grid item container key={variant.id} spacing={2} alignItems="center">
            <Grid item xs={1}>
              <Radio value={variantValues[index]} />
            </Grid>
            <Grid item xs={10}>
              <TextField
                {...register(`variants.${index}`)}
                fullWidth
                label="Текст варианта"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton color="error" onClick={deleteVariant(index)}>
                <Remove />
              </IconButton>
            </Grid>
          </Grid>
        ))}
    </Grid>
  )
}
