import { constants } from "@/utils";
import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch(constants.apiUrl + "user/sign-up", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            email: user.email
          })
        });
        if (res.status === 201) return true;
      } catch (err) {
        console.error("sign-up err", err);
      }
      return false;
    },
    async session({ session, token }) {
      return {
        ...session,
        id: token.sub
      };
    }
  }
});

export { handler as GET, handler as POST };
