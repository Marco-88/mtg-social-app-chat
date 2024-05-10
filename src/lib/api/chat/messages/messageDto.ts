export interface MessageDto {
    id: string
    chatId: string
    senderId: string
    content: string,
    createdAt: Date
    updatedAt?: Date
}