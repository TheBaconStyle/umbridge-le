import { Add, DragIndicator, Edit, Remove, Save } from "@mui/icons-material"
import { Grid, IconButton, TextField } from "@mui/material"
import { Reorder, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

export function OrderAnswer() {
  const { control, watch, register, setValue, getValues } = useFormContext()
  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({ control, name: "answer" })

  const currentType = watch("type")
  const previousType = getValues("type")

  useEffect(() => {
    if (currentType !== previousType) {
      answers.forEach((_, index) => removeAnswer(index))
      setOrder([])
    }
  }, [currentType, previousType, removeAnswer, answers])

  const [order, setOrder] = useState<any[]>([])

  const [editIndex, setEditIndex] = useState(-1)

  if (currentType !== "order") return null

  const isEditStarted = editIndex !== -1

  const addAnswer = () => {
    if (!order.includes(order.length + 1)) {
      const newValue = String(order.length + 1)
      appendAnswer(newValue)
      setOrder([...order, newValue])
    }
  }

  const editAnswer = (index: number) => () => {
    if (editIndex === index) {
      const orderValues = getValues("answer")
      setOrder(orderValues)
      setEditIndex(-1)
      return
    }
    setEditIndex(index)
  }

  const deleteAnswer = (index: number) => () => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)])
    removeAnswer(index)
  }

  const editOrder = (newOrder: any[]) => {
    setOrder(newOrder)
    setValue("answer", newOrder)
  }

  return (
    <Grid
      component={Reorder.Group}
      container
      spacing={2}
      alignItems="center"
      sx={{ listStyle: "none", pl: 0 }}
      values={order}
      onReorder={editOrder}
    >
      <Grid item xs={11}>
        Варианты ответа (расставить по порядку сверху вниз)
      </Grid>

      <Grid item xs={1}>
        <IconButton
          color="primary"
          onClick={addAnswer}
          disabled={isEditStarted}
        >
          <Add />
        </IconButton>
      </Grid>

      {order.map((item, index) => (
        <Grid
          component={Reorder.Item}
          value={item}
          key={item}
          item
          container
          spacing={2}
          xs={12}
          alignItems="center"
          drag={!isEditStarted && "y"}
        >
          <Grid item xs={1}>
            <DragIndicator component={motion.svg} sx={{ cursor: "grab" }} />
          </Grid>
          <Grid item xs={9}>
            <TextField
              {...register(`answer.${index}`)}
              fullWidth
              disabled={!isEditStarted || editIndex !== index}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              disabled={editIndex !== index && isEditStarted}
              onClick={editAnswer(index)}
            >
              {editIndex === -1 || editIndex !== index ? <Edit /> : <Save />}
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              color="error"
              sx={{ ml: "auto" }}
              disabled={isEditStarted}
              onClick={deleteAnswer(index)}
            >
              <Remove />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
