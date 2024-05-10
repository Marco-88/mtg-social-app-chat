export interface UserDto {
    id: string
    username: string
    email: string
    password: string
    image: string
    isAdmin: boolean
    createdAt: Date
    updatedAt?: Date
}