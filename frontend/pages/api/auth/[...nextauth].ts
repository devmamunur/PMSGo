import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials: Record<string, string> | undefined) => {
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),
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

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },

    },
})