import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material"
import { useFormContext } from "react-hook-form"
import { questionTypeVariants } from "@server/question/schema/createQuestion.schema"
import { useId } from "react"

export function TypeSelect() {
  const { watch, setValue } = useFormContext()
  const labelId = useId()
  const id = useId()
  const labelText = "Тип вопроса"
  const changeType = ({ target: { value } }: SelectChangeEvent<string>) =>
    setValue("type", value)
  const currentType = watch("type", questionTypeVariants[0])
  return (
    <FormControl>
      <InputLabel id={labelId}>{labelText}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        fullWidth
        label={labelText}
        onChange={changeType}
        value={currentType}
      >
        {questionTypeVariants.map((variant) => (
          <MenuItem value={variant} key={variant}>
            {variant}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
