import { Account, JWT, User } from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: Account.accessToken,
        user?: {
            id?: string,
            isAdmin?: boolean
        }
    }

    interface User {
        isAdmin?: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string,
        isAdmin?: boolean,
        accessToken?: Account.accessToken,
    }
}