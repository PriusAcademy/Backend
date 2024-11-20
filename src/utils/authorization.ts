import { Request } from "express";

type CustomRequest = Request & {userId:string}

export const isAuthorized = (request: Request) => {
    const req = request as CustomRequest
    const userId = process.env.ADMIN_EMAIL
    return req.userId === userId
}