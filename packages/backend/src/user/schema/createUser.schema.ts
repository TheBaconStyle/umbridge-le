import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
})

export type TCreateUserSchema = z.infer<typeof createUserSchema>
