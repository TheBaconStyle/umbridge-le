"use client"

import { Box } from "@mui/material"
import { Question } from "@server/question/entities/question.entity"

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
  return <Box></Box>
}
