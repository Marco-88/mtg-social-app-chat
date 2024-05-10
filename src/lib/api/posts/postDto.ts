export interface PostDto {
    userId: string
    id: string
    title: string
    description: string
    image: string
    slug: string
    createdAt: Date
    updatedAt?: Date
}

export interface PostCreate {
    userId: string | FormDataEntryValue
    title: string | FormDataEntryValue
    description: string | FormDataEntryValue
    slug: string | FormDataEntryValue
}