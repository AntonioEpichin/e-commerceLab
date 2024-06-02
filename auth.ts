import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import db from "@/lib/db";
import {compareSync} from 'bcrypt-ts';


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: { },
            },
            async authorize(credentials) {

                const email = credentials.email as string;
                const password = credentials.password as string;

                if (!email || !password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: {
                        email: email,
                    },
                }); // Find user in database

                if (!user) {
                    return null;
                }
                
                const matches = compareSync(password, user.password ?? "");

                if (matches) {
                    return { id: user.id, email: user.email };
                }
                return null;
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
})