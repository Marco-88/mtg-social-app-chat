import { NextRequest } from "next/server";

interface RouteHandler {
    path: string
    condition: boolean
    redirectPath?: string
}

export class AuthHandler {
    private readonly routerHandlers: RouteHandler[] = []

    constructor(private readonly request: NextRequest) {}

    addRouteHandler (path: string, condition: boolean, redirectPath?: string): void {
        this.routerHandlers.push({path, condition, redirectPath})
    }

    apply (): boolean | Response {
        const handler = this.routerHandlers
            .find(handler => handler.path === this.request.nextUrl.pathname)

        // if(handler) {
        //     if (handler.condition) {
        //         if(handler.redirectPath) {
        //             return Response.redirect(new URL('/', this.request.nextUrl))
        //         }
        //         return false
        //     }
        // }

        if(!handler || !handler.condition) {
            return true
        }

        if(handler.redirectPath) {
            return Response.redirect(new URL('/', this.request.nextUrl))
        }

        return false
    }
}