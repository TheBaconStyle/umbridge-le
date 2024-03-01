import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const AuthConfig = {
  callbacks: {
    async session({ session, token }: any) {
      if (token) {
        session.user.jwt = token.jwt
        session.user.id = token.id
        session.user.type = token.type
      }
      return session
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.jwt = user.jwt
        token.type = user.type
      }

      return token
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // async authorize(credentials, request) {},
    }),
  ],
  pages: { signIn: "/auth/signin" },
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({ providers: [], callbacks: {}, pages: {} })
