import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/schema";
import { compareSync } from "bcrypt-ts";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { username, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const passMatch = compareSync(password, user.password);

        if (!passMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Cek apakah URL diawali dengan '/admin'
      const isProtectedRoute = nextUrl.pathname.startsWith("/admin");

      if (!isLoggedIn && isProtectedRoute) {
        return Response.redirect(new URL("/signin", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/signin")) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
});
