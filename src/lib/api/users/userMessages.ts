import { wentWrong } from "@/lib/api/appMessages";

export const userMessages = {
    createUserError: wentWrong + ' on creating a new user',
    deleteUserError: (id: string) => `${wentWrong} on deleting user (${id})}`,
    displayUserError: (id: string) => `${wentWrong} on displaying user (${id})`,
    displayAllUsersError: wentWrong + ' on displaying users'
}