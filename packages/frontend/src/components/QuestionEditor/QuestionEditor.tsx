"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, TextField, Typography } from "@mui/material"
import type { Question } from "@server/question/entities/question.entity"
import { createQuestionSchema } from "@server/question/schema/createQuestion.schema"
import { updateQuestionSchema } from "@server/question/schema/updateQuestion.schema"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  MatchAnswer,
  MultipleAnswer,
  OpenAnswer,
  OrderAnswer,
  SingleAnswer,
} from "./AnswerVariants"
import { TypeSelect } from "./TypeSelect"

export type TQuestionEditor =
  | {
      mode: "create"
    }
  | {
      mode: "edit"
      questionData: {
        variants: Question["variants"]
        answer: Question["answer"]
        type: Question["type"]
        text: Question["text"]
        id: Question["id"]
      }
    }

export function QuestionEditor(props: TQuestionEditor) {
  const questionForm = useForm({
    resolver: zodResolver(
      props.mode === "create" ? createQuestionSchema : updateQuestionSchema,
    ),
    defaultValues:
      props.mode === "edit" ? props?.questionData : { type: "single" },
  })

  const { handleSubmit, register, watch, setValue } = questionForm

  const currentType = watch("type")

  useEffect(() => {
    if (currentType === "match" || currentType === "multiple") {
      setValue("answer", [])
      setValue("variants", [])
    }
    if (currentType === "open") {
      setValue("answer", "")
      setValue("variants", undefined)
    }
    if (currentType === "order") {
      setValue("answer", [])
      setValue("variants", undefined)
    }
    if (currentType === "single") {
      setValue("answer", "")
      setValue("variants", [])
    }
  }, [currentType, setValue])

  const sendData = handleSubmit(
    (data) => console.log(JSON.stringify(data)),
    (data) => {
      alert(
        JSON.stringify(
          Object.values(data).map((value) => {
            return value.message
          }),
        ),
      )
    },
  )

  return (
    <Box sx={{ p: 3, m: "auto", maxWidth: "960px" }}>
      <Typography variant="h6" mb={2}>
        {props.mode === "create" && "Создание вопроса"}
        {props.mode === "edit" && "Изменение вопроса"}
      </Typography>
      <FormProvider {...questionForm}>
        <Box
          component={"form"}
          onSubmit={sendData}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField {...register("text")} label="Текст вопроса" fullWidth />
          <TypeSelect />
          <MatchAnswer />
          <MultipleAnswer />
          <OrderAnswer />
          <OpenAnswer />
          <SingleAnswer />
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </Box>
      </FormProvider>
    </Box>
  )
}
