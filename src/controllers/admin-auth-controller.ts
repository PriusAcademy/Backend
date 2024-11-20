import jwt from 'jsonwebtoken'
import { Request, Response } from "express";



export const adminSignIn = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password} = await req.body


        const ADMIN_PASSWORD = process.env.admin_password
        const ADMIN_EMAIL = process.env.admin_email


        if(ADMIN_PASSWORD != password || ADMIN_EMAIL != email){
            throw new Error("Invalid Credentials")
        }

        const token = jwt.sign({email,id:password},process.env.JWT_SECRET_KEY as string,{})

        return res.status(200).json({"token":token})
    } catch (error) {
        console.log("ADMIN SIGNIN CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
