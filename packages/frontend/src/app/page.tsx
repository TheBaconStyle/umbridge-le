import { trpc } from "@web/api"

export default async function Home() {
  const { greeting } = await trpc.hello.query({ name: "my new architecture" })
  return <div>{greeting}</div>
}
