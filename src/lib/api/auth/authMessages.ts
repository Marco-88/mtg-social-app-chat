import { wentWrong } from "@/lib/api/appMessages";

export const authMessages = {
    invalidCredentials: 'Invalid Username / Email and/or Password',
    invalidEmailCredentials: 'Invalid Email or Password',
    invalidUsernameCredentials: 'Invalid Username or Password',
    userExists: 'User already exists',
    emailIsInUse: 'Email is already in use',
    authError: wentWrong + ' while authorizing with GitHub',
}