import { constants } from "@/utils";
import { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes } from "crypto";

function generateRandomString(length: number) {
  return randomBytes(length).toString("hex");
}

function generateRandomEmail() {
  const randomString = generateRandomString(8);
  return `${randomString}@example.com`;
}

const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      id: "telephone",
      name: "Credentials",
      credentials: {},
      authorize(credentials, req) {
        const randomId = generateRandomString(16);
        const randomEmail = generateRandomEmail();

        const user = { id: randomId, email: randomEmail };
        console.log("user", user);

        return user;
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
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
        user: {
          ...session.user,
          id: token.sub
        }
      };
    }
  }
};

export { authOptions };
