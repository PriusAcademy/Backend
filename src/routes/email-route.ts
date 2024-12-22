import nodemailer from 'nodemailer'
import multer from 'multer'
import express from 'express'

const router = express.Router()
const upload = multer({storage : multer.memoryStorage()})

router.post('/', upload.single('attachment'), async (req, res) => {
    // const { email, subject, message } = await req.body
    try {

        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",  // or your SMTP server
        port: 587,
        secure: false,  // Set to false for STARTTLS
        auth: {
            user: "rajesh99ed@gmail.com",
            pass: process.env.password
        },
        tls: {
            rejectUnauthorized: false, // Skip SSL certificate verification (use cautiously)
        },
        });

        const mailOptions = {
            from: "rajesh1884537@gmail.com",
            to: "rajesh99ed@gmail.com",
            subject: "rajesh99ed@gmail.com",
            attachments: [
                {
                    filename: req.file?.originalname,
                    content : req.file?.buffer
                }
            ]
        }
       console.log("FINAL")
        await transporter.sendMail(mailOptions)

         res.status(200).send("Email send successfully")
        
    } catch (error) {
        console.log("SENDING MAIL ROUTE",error)
        res.status(500).send("Failed to send email")
    }
})

export default router