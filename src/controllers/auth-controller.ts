import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const signUp = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password,collegeId,registerNumber,name} = await req.body

        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })

        if (user){
            return res.status(401).send({error:"User already existing"})
        }

        const lastUser = await prisma.user.findFirst({
            orderBy: {
            createdAt : 'desc'
            },
        });

        let nextCode = 1;

        if (lastUser && lastUser.code) {
            const lastCode = lastUser.code // Convert to integer
            nextCode = lastCode+1 // Increment and pad with zeros
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const newUser = await prisma.user.create({
            data : {
                email,
                hashedPassword,
                registerNumber,
                collegeId,
                code: nextCode,
                name
            },
            include: {
                college : true
            }
        })

        // console.log(process.env.JWT_SECRET_KEY)
        let token = jwt.sign({email,id:newUser.id},process.env.JWT_SECRET_KEY as string,{})

        return res.status(200).json({
            token,
            id:newUser.id,
            email:newUser.email,
            institute: newUser.college.name,
            code: nextCode,
            name
        })

    } catch (error) {
        console.log("SIGN UP MIDDLEWARE",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}

export const signIn = async (req:Request,res:Response):Promise<any>=>{
    try {
        const { email, password, registerNumber } = await req.body
        
        let existingUser;

        if (email) {
                existingUser = await prisma.user.findUnique({
                where : {
                    email
                }, include: {
                    college : true
                }
            })
        }

        if (registerNumber) {
                existingUser = await prisma.user.findUnique({
                where : {
                    registerNumber
                }, include: {
                    college : true
                }
            })
        }
        

        if(!existingUser){
            throw new Error("User doesn't existing")
        }

        const correctPassword = await bcrypt.compare(password,existingUser.hashedPassword as string)

        if(!correctPassword){
            throw new Error("Invalid Credentials")
        }

        // console.log(process.env.JWT_SECRET_KEY)
        const token = jwt.sign({email,id:existingUser.id},process.env.JWT_SECRET_KEY as string,{})

        return res.status(200).json({
            token,
            id:existingUser.id,
            email:existingUser.email,
            institute: existingUser.college.name,
            name: existingUser.name,
            code:existingUser.code
        })
    } catch (error) {
        console.log("SIGNIN CONTROLLER",error)
        return res.status(500).json({message:"Something Went wrong"})
    }
}
