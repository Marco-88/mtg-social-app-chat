export interface ChatDto {
    id: string
    userId: string
    name: string
    members: string[],
    createdAt: Date
    updatedAt?: Date
}