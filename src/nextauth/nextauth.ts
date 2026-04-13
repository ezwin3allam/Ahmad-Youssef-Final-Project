import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

interface LoginResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Login",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async function (credentials) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );

        const data: LoginResponse = await res.json();

        if (data.message === "success") {
          const { name, email, _id } = data.user;
          return {
            _id,
            id: _id,
            name,
            email,
            freshCartToken: data.token,
            provider: "credentials",
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt({ user, token, account }) {
      if (user) {
        token.freshCartToken = (user as { freshCartToken?: string }).freshCartToken ?? null;
        token.provider = account?.provider ?? "credentials";
      }
      return token;
    },
    session({ session, token }) {
      (session.user as { freshCartToken?: string | null }).freshCartToken =
        token.freshCartToken as string | null;
      (session.user as { provider?: string }).provider =
        token.provider as string;
      return session;
    },
  },
};
