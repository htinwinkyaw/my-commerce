import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "../app/_lib/prismadb";
import userServices from "./services/userServices";
import bcrypt from "bcrypt";

const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "example@email.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<any> {
        const user = await userServices.authenticate(
          credentials?.email,
          credentials?.password
        );
        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "production",
};

export default authOptions;
