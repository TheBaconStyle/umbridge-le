"use client"

import { Add, Save } from "@mui/icons-material"
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material"
import { Question } from "@server/question/entities/question.entity"
import type { TCreateQuestionSchema } from "@server/question/schema/createQuestion.schema"
import { createQuestion } from "@web/actions"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import {
  MatchVariants,
  MultipleVariants,
  OrderVariants,
  SingleVariants,
} from "./variants"

export type TQuestionEditor = {
  questionData?: {
    variants: Question["variants"]
    answer: Question["answer"]
    type: Question["type"]
    text: Question["text"]
    id: Question["id"]
  }
}

export function QuestionEditor({ questionData }: TQuestionEditor) {
  const [variants, setVariants] = useState<Question["variants"]>(
    questionData?.variants ?? [],
  )
  const [answer, setAnswer] = useState<Question["answer"]>(
    questionData?.answer ?? [],
  )
  const [type, setType] = useState<Question["type"]>(
    questionData?.type ?? "match",
  )
  const [text, setText] = useState<Question["text"]>(questionData?.text ?? "")

  useEffect(() => {
    if (type === "open") {
      setAnswer("")
      setVariants(undefined)
    }
    if (type === "match" || type === "multiple") {
      setAnswer([])
      setVariants([])
    }
    if (type === "single") {
      setVariants([])
      setAnswer(String("undefined"))
    }
    if (type === "order") {
      setVariants(undefined)
      setAnswer([])
    }
  }, [type])

  function addVariant() {
    if (type === "match" || type === "order") {
      Array.isArray(answer) && setAnswer([...answer, ""])
    }
    Array.isArray(variants) && setVariants([...variants, ""])
  }

  const submitData = async () => {
    let res
    if (questionData) {
      res = (() => ({ status: null, data: ["null"] }))()
    } else {
      res = await createQuestion(
        {
          type,
          answer,
          text,
          variants,
        } as TCreateQuestionSchema,
        Date.now(),
      )
    }

    const { status, data } = res

    if (status === "success") {
      enqueueSnackbar({
        variant: "simple",
        color: "success",
        message: "Изменения успешно сохранены",
      })
      return
    }

    data.forEach((err) =>
      enqueueSnackbar({
        variant: "simple",
        color: "error",
        message: err,
      }),
    )
  }

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        gap: 2,
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">Создание вопроса</Typography>
      <Autocomplete
        options={["match", "multiple", "open", "order", "single"]}
        renderInput={(params) => (
          <TextField {...params} label="Тип вопроса" name="type" />
        )}
        value={type}
        onChange={(_, value) => setType(value as Question["type"])}
      />
      <Box>
        <TextField
          multiline
          fullWidth
          value={text}
          label="Текст вопроса"
          onChange={({ target: { value } }) => setText(value)}
        />
      </Box>

      {type === "match" && (
        <MatchVariants
          answer={answer}
          setAnswer={setAnswer}
          setVariants={setVariants}
          variants={variants}
        />
      )}

      {type === "single" && (
        <SingleVariants
          answer={answer}
          setAnswer={setAnswer}
          setVariants={setVariants}
          variants={variants}
        />
      )}

      {type === "multiple" && (
        <MultipleVariants
          answer={answer}
          setAnswer={setAnswer}
          setVariants={setVariants}
          variants={variants}
        />
      )}

      {type === "order" && Array.isArray(answer) && (
        <OrderVariants
          answer={answer}
          setAnswer={(answers) => setAnswer(answers as string[])}
        />
      )}

      {type === "open" && (
        <Box>
          <TextField
            onChange={({ target: { value } }) => setAnswer(value)}
            fullWidth
            label="Ответ"
          />
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {type && type !== "open" && type !== "order" && (
          <Button variant="outlined" onClick={addVariant}>
            добавить вариант&nbsp;
            <Add fontSize="small" />
          </Button>
        )}
        <Button variant="contained" onClick={submitData}>
          Сохранить&nbsp;
          <Save fontSize="small" />
        </Button>
      </Box>
      <Box>{JSON.stringify({ answer, variants, text, type })}</Box>
    </Box>
  )
}
