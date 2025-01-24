// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect(url, baseUrl) {
      return baseUrl;
    },
  },
  secrets: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/Register",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
