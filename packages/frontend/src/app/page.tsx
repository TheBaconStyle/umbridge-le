"use client"

import { crtUsr } from "@web/actions"

export default function Home() {
  return (
    <div>
      <button onClick={async () => console.log(await crtUsr())}>
        create user
      </button>
    </div>
  )
}
