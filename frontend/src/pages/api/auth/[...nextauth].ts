import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import axios from '@/services/axios';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        type: { label: 'Type', type: 'text' },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: Record<string, string> | undefined) => {
        try {
          let payload = {
            type: credentials?.type,
            email: credentials?.email,
            password: credentials?.password,
          };
          const response = await axios.post('/signin', payload);
          if (response.data.user) {
            return response.data.user as any;
          } else {
            return null;
          }
        } catch (error: any) {
          console.error('Failed to authenticate:', error.message);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      return {...token, ...user};
    },
    async session({ session, token }) {
      const jwtToken : any = token.accessToken;
      function getExpirationDate(jwtToken: any) {
        const base64Url = jwtToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        const payload = JSON.parse(decodedPayload);
        const expTimestamp = payload.exp;
        return new Date(expTimestamp * 1000).toISOString();
      }
      const expirationDate = getExpirationDate(jwtToken);
      session.user = token as any;
      if (session && session.user) {
        (session.user as any).exp = Math.floor(new Date(expirationDate).getTime() / 1000);
      }
      session.expires = expirationDate;
      return session;
    },
  },
};
export default NextAuth(authOptions);
