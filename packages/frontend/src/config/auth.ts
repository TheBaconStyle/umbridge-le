import { signInSchema } from "@server/user/schema/signIn.schema"
import { trpc } from "@web/trpc"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const credProvider = CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    console.log(credentials)
    // const validCredentials = await signInSchema.safeParseAsync(credentials)
    // if (!validCredentials.success) return null
    // const user = await trpc.users.signIn.mutate(validCredentials.data)
    // if (!user) return null
    // return user
    return { email: "qwe", id: "qwe", image: "/qwe", name: "qwe" }
  },
})

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [credProvider],
  callbacks: {
    authorized: async ({ auth, request }) => {
      return !!auth?.user
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
})
