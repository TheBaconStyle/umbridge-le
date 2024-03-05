import { z } from 'zod'

export const questionTypeVariants = [
  'single',
  'multiple',
  'order',
  'match',
  'open',
] as const

export const createQuestionSchema = z.object({
  text: z.string().min(1),
  type: z.enum(questionTypeVariants),
  variants: z.string().array().optional(),
  answer: z.union([z.string().array().nonempty(), z.string()]),
})

export type TCreateQuestionSchema = z.infer<typeof createQuestionSchema>
