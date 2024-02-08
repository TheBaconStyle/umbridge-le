import { z } from 'zod'

export const questionTypeVariants = [
  'single',
  'multiple',
  'order',
  'match',
  'open',
] as const

const JSONObjectSchema = z.object({}).refine((data) => {
  return Object.entries(data).every(
    (entry) => typeof entry[0] === 'string' && typeof entry[1] === 'string',
  )
})

export const createQuestionSchema = z.object({
  text: z.string(),
  type: z.enum(questionTypeVariants),
  variants: z.union([z.array(z.string()), z.undefined()]),
  answer: z.union([
    z.string(),
    z.number(),
    z.array(z.number()),
    JSONObjectSchema,
  ]),
})

export type TCreateQuestionSchema = z.infer<typeof createQuestionSchema>
