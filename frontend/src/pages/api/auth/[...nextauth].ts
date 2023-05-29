import NextAuth, {NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions : NextAuthOptions  = {
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials: Record<string, string> | undefined) => {
                try {
                    let payload = {
                        email   : credentials?.email,
                        password: credentials?.password
                    }

                    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });
                    const user = await response.json();
                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Failed to authenticate:', error);
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