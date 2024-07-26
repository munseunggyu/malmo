import { authOptions } from "@/auth";
import { constants } from "@/utils";
import NextAuth, { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
