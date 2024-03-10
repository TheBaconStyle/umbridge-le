import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const credProvider = CredentialsProvider({
  name: "credentials",
  credentials: {
    identifier: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  // async authorize(credentials, request) {},
})

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [credProvider],
  callbacks: {},
  pages: { signIn: "/auth/signin" },
})
