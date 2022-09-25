import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.ADMIN_GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.ADMIN_GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
};

export default NextAuth(authOptions);
