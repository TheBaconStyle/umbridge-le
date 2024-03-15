"use server"

import { TCreateUserSchema } from "@server/user/schema/createUser.schema"
import { trpc } from "@web/trpc"

export async function createUser(data: TCreateUserSchema, _timestamp?: Date) {
  return await trpc.users.create.mutate(data)
}
