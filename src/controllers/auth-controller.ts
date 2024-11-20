import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const signUp = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password,institute} = await req.body

        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })

        if (user){
            return res.status(401).send({error:"User already existing"})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const newUser = await prisma.user.create({
            data : {
                email,
                hashedPassword,
                institute
            }
        })

        let token = jwt.sign({email,id:newUser.id},process.env.JWT_SECRET_KEY as string,{})

        return res.status(200).json({
            token,
            id:newUser.id,
            email:newUser.email,
            institute:newUser.institute
        })

    } catch (error) {
        console.log("SIGN UP MIDDLEWARE",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const signIn = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password} = await req.body

        let existingUser = await prisma.user.findUnique({
            where : {
                email
            }
        })

        if(!existingUser){
            throw new Error("User doesn't existing")
        }

        const correctPassword = await bcrypt.compare(password,existingUser.hashedPassword as string)

        if(!correctPassword){
            throw new Error("Invalid Credentials")
        }

        const token = jwt.sign({email,id:existingUser.id},process.env.JWT_SECRET_KEY as string,{})

        return res.status(200).json({
            token,
            id:existingUser.id,
            email:existingUser.email,
            institute:existingUser.institute
        })
    } catch (error) {
        console.log("SIGNIN CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
