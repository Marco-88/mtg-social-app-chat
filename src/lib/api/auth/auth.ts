import NextAuth, { Account, NextAuthConfig, Profile } from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "@/lib/mongo";
import { User } from "@/lib/api/users/userSchema";
import { handleError } from "@/lib/errorHandler";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { authConfig } from "@/lib/auth.config";
import { authMessages } from "@/lib/api/auth/authMessages";

const gitHubProvider = GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET
})

const handleGitHubSignInCallback = async (account: Account, profile: Profile) => {
    try {
        await connectToDb()
        const user = await User.findOne({email: profile.email})

        if(!user) {
            const newUser = new User({
                username: profile.login,
                email: profile.email,
                image: profile.avatar_url
            })

            await newUser.save()
        }
    } catch(error: any) {
        handleError(StatusCodes.INTERNAL_SERVER_ERROR, authMessages.authError, error)
        return false
    }
    return true
}

const handleLoginWithCredentials = async (credentials: Partial<Record<string, unknown>>/*{id: string, password: string}*/) => {
    try {
        await connectToDb()

        let user = await User.findOne({username: credentials.id})
        user = user ? user : await User.findOne({email: credentials.id})

        if(!user) {
            if((credentials.id as string).includes('@')) {
                return { error: authMessages.invalidEmailCredentials }
            }
            return { error: authMessages.invalidUsernameCredentials }
        }

        const passwordMatches = await bcrypt.compare(credentials.password as string, user.password)

        if(!passwordMatches) {
            return { error: authMessages.invalidCredentials }
        }

        return user
    } catch (error: any) {
        return null
    }
}

const credentialsProvider = CredentialsProvider({
    async authorize(credentials) {
        return await handleLoginWithCredentials(credentials)
    }
})

const nextAuthConfig: NextAuthConfig = {
    ...authConfig,
    providers: [gitHubProvider, credentialsProvider],
    callbacks: {
        async signIn({ account, profile}){
            if(account?.provider === 'github') {
                return await handleGitHubSignInCallback(account!, profile!)
            }
            return true
        },
        ...authConfig.callbacks,
    }
}

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(nextAuthConfig)