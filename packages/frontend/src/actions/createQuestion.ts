"use server"

import type { TCreateQuestionSchema } from "@server/question/schema/createQuestion.schema"
import { trpc } from "@web/trpc"
import { TTRPCActionReturn } from "."

type TCreateQuestionReturn = TTRPCActionReturn<
  Awaited<ReturnType<typeof trpc.questions.create.mutate>>
>

export async function createQuestion(
  questionData: TCreateQuestionSchema,
  date: number,
): Promise<TCreateQuestionReturn> {
  console.log(date)
  try {
    const data = await trpc.questions.create.mutate(questionData)
    return {
      status: "success",
      data,
    }
  } catch (error) {
    let messages = []
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      messages = JSON.parse(error.message).map((err: any) => err.message)
    }
    return {
      status: "error",
      data: messages,
    }
  }
}
