import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const useSecureCookies = process.env.VERCEL === '1';
const cookiePrefix = useSecureCookies ? '__Secure-' : '';
const csrfCookiePrefix = useSecureCookies ? '__Host-' : '';

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  pages: {
    signIn: '/admin/login',
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}ibanez-admin.session-token`,
    },
    callbackUrl: {
      name: `${cookiePrefix}ibanez-admin.callback-url`,
    },
    csrfToken: {
      name: `${csrfCookiePrefix}ibanez-admin.csrf-token`,
    },
  },
  providers: [
    Credentials({
      name: 'Admin',
      credentials: {
        usuario: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async (credentials) => {
        const usuario = String(credentials?.usuario ?? '').trim().toLowerCase();
        const password = String(credentials?.password ?? '');

        if (!usuario || !password) return null;

        const admin = await prisma.admin.findUnique({
          where: { usuario },
        });

        if (!admin) return null;

        const passwordOk = await bcrypt.compare(password, admin.passwordHash);
        if (!passwordOk) return null;

        return {
          id: admin.id,
          name: admin.usuario,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
