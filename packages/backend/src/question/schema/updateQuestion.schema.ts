import { z } from 'zod'
import { createQuestionSchema } from './createQuestion.schema'

export const updateQuestionSchema = createQuestionSchema.partial().extend({
  id: z.number(),
})

export type TUpdateQuestionSChema = z.infer<typeof updateQuestionSchema>
