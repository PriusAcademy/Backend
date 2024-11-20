
import axios from "axios";
import jwt from 'jsonwebtoken'
import { NextFunction,Request,Response } from "express";

export interface CustomRequest extends Request {
    userId? : string;
    name : string;
    sub? : string
}

interface DecodedToken {
    id : string;
    name : string;
    sub? : string
}

export const isAuthorized = (request: Request) => {
    const req = request as CustomRequest
    const userId = process.env.ADMIN_EMAIL
    return req.userId === userId
}

export const adminAuth = async (request:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        let req = request as CustomRequest
        let token = req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(400).json("Authentication failed. Token missing")
        }

        const isJWtGenerated = jwt.decode(token,{complete:true}) !== null

        let decoded;

        if(isJWtGenerated){
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {email:string}
            req.userId = decoded.email
        }

        else {
            const {data} = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`,{headers : {Authorization : `Bearer ${token}`}})
            decoded = data
            req.userId = data?.sub as string
        }

        if (!isAuthorized(req)) {
             return res.status(400).json("UNAUTHORIZED")
        }
        
        return next()

    } catch (error) {
        console.log("ADMIN AUTH MIDDLEWARE",error)
        return res.status(400).json("Invalid Credentials")
    }
}