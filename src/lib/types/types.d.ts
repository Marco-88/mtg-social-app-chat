import { ReactNode } from "react";

export interface AppFormState {
    error?: string
    success?: boolean
}

export interface ViewItem {
    key: string
    component: ReactNode
}

export type FormAction =
    (previousState: Awaited<AppFormState>, data: FormData) =>
        Promise<{success: boolean, error?: string} | {success?: boolean, error: string}>

export interface FormActionConfig {
    collection: CollectionName
    action: CollectionAction
}

export type CollectionName = 'posts' | 'users'
export type CollectionAction = 'create' | 'delete' | 'edit'