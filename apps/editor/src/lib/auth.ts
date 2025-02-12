import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import authConfig from "auth.config";
import type {} from "next";
import NextAuth, { type NextAuthResult, type Session } from "next-auth";
import type {} from "next-auth/providers";

type ApiAuthHandler = () => Promise<Session | null>;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
}) as Omit<NextAuthResult, "auth"> & {
  auth: ApiAuthHandler;
};
