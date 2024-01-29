"use server"

import { trpc } from "@web/api"

export async function crtUsr() {
  const res = await trpc.users.create.mutate({
    email: "qwe@qwe.qwe",
    password: "ZPzhgE2PBbjb@",
  })
  return res
}
