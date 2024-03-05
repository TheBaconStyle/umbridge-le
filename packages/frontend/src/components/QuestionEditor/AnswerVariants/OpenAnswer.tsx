import { TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"

export function OpenAnswer() {
  const { register, watch } = useFormContext()
  const currentType = watch("type")
  if (currentType !== "open") return null
  return <TextField {...register("answer")} fullWidth label="Текст ответа" />
}
