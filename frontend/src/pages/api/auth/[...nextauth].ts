import NextAuth, {NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import axios from '@/services/axios';

export const authOptions : NextAuthOptions  = {
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                type: { label: 'Type', type: 'text'},
                email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials: Record<string, string> | undefined) => {
                try {
                    let payload = {
                        type   : credentials?.type,
                        email   : credentials?.email,
                        password: credentials?.password
                    }
                    const response = await axios.post('/signin', payload);
                    if (response.data.user) {
                        return response.data.user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Failed to authenticate:', error.message);
                    return null;
                }
            },
        }),
    ],
    session  : {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        }
    },
}
export default NextAuth(authOptions)