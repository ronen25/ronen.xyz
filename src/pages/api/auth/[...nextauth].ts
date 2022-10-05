import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.ADMIN_GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.ADMIN_GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
};

export default NextAuth(authOptions);
