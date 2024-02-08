"use server"

import { TCreateQuestionSchema } from "@server/question/schema/create.schema"
import { trpc } from "@web/api"

export async function crtQuestion(data: TCreateQuestionSchema) {
  return trpc.questions.create.query(data)
}
