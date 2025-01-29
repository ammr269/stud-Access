import { prisma } from '../../../../lib/prisma';
import { hashPassword, verifyPassword } from '@/libraries/utils.server';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'asma' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password, action } = credentials;
        if (!email || !password || !action) {
          throw new Error('Email, mot de passe et action requis.');
        }
        if (action !== 'signin' && action !== 'signup') {
          throw new Error(
            "Veuillez spécifier s'il s'agit d'une inscription ou une connexion",
          );
        }
        const maybeUser = await prisma.user.findUnique({ where: { email } });

        if (action === 'signin') {
          if (!maybeUser) {
            throw new Error('Email ou mot de passe incorrect.');
          }
          const hashPwd = maybeUser.hashPassword;
          const isCorrect = await verifyPassword(password, hashPwd);
          if (!isCorrect) {
            throw new Error('Email ou mot de passe incorrect.');
          }
          return maybeUser;
        }

        const { name } = credentials;
        const hashPwd = await hashPassword(password); // Utilisation de await
        const user = await prisma.user.create({
          data: { name, email, hashPassword: hashPwd },
        });

        return user;
      },
    }),
  ],
  strategy: 'jwt',
  callbacks: {
    async jwt({ token, user }) {
      // const tokenWithUser= token
      // correction de 'acount' en 'account'
      if (user) {
        token.user = {
          id: user.id_user,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      } else {
        // const tokenUser= tokenWithUser.user
        const userFromDb = await prisma.user.findUnique({
          where: { id_user: token.user.id },
        });
        if (userFromDb) {
          token.user = {
            id: userFromDb.id_user,
            name: userFromDb.name,
            image: userFromDb.image,
            role: userFromDb.role,
          };
        }
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.role = token.user.role;
      return session;
    },
  },
};
