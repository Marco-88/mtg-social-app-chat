import { JWT } from "@auth/core/jwt";
import { Profile, Session, User } from "next-auth";
import { Awaitable } from "@auth/core/types";
import { NextRequest } from "next/server";
import { AuthHandler } from "@/lib/authHandler";

export const authConfig= {
    pages: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        async jwt({token, user}: {token: JWT, user: User, profile: Profile} | any): Promise<JWT> {
            // console.log('*** Jwt User: ', user)

            if(user) {
                token.id = user.id
                token.isAdmin = user.isAdmin
            }
            return token
        },
        async session({ session, token }: {session: Session, token: JWT}): Promise<Session>{
            // console.log('*** Session Token: ', token)

            if(token) {
                session.user!.id = token.id as string
                session.user!.isAdmin = token.isAdmin as boolean
            }
            return session
        },
        authorized({auth, request}: {auth: Session | null, request: NextRequest}): Awaitable<boolean | Response> {
            const user = auth?.user
            const authHandler = new AuthHandler(request)

            // console.log('*** Authorized User: ', user)

            authHandler.addRouteHandler('/admin', !user?.isAdmin!)
            authHandler.addRouteHandler('/blog', !user)
            authHandler.addRouteHandler('/admin', !!user, '/')
            authHandler.addRouteHandler('/login', !!user, '/blog')
            authHandler.addRouteHandler('/register', !!user, '/blog')

            return authHandler.apply()
        }
    }
}