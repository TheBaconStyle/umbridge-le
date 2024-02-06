"use server"

import { trpc } from "@web/api"

export async function crtUsr() {
  const res = await trpc.questions.create.query({
    text: "qweqwe",
    type: "single",
    variants: ["1", "2", "3", "4"],
    answer: Date.now(),
  })
  return res
}
