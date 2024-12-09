
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

export const auth = async (request:Request,res:Response,next:NextFunction)=>{
    try {
        let req = request as CustomRequest
        let token = req.headers.authorization?.split(" ")[1]

        if(!token){
            throw new Error("Authentication failed. Token missing")
        }

        const isJWtGenerated = jwt.decode(token,{complete:true}) !== null

        let decoded;
        
        if (isJWtGenerated) {
            decoded = jwt.verify(token,"SECRET_KEY") as DecodedToken
            req.userId = decoded.id
        }

        else {
            const {data} = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`,{headers : {Authorization : `Bearer ${token}`}})
            decoded = data
            req.userId = data?.sub as string
        }

        req.name = decoded.FieldNamespace

        next()

    } catch (error) {
        console.log("AUTH MIDDLEWARE",error)
        throw new Error("Unauthenticated")
    }
}