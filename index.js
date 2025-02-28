
const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});


const sendEmail = async (receiver) => {
    try {
        const emailResponse = await transporter.sendMail(receiver);
        console.log("Email sent successfully:", emailResponse);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


const receiver = {
    from: process.env.EMAIL_USER, 
    to: "banshvatsa1@gmail.com",
    subject: "Test Email",
    text: "Hello, this is a test email sent using Node.js",
};


sendEmail(receiver);
