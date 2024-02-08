"use server"

export async function send(data: FormData) {
  console.log(Object.fromEntries(data.entries()))
}
