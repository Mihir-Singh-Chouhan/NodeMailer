const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/send-email", async (req, res) => {
    const receiver = {
        from: process.env.EMAIL_USER,
        to: req.body.to, 
        subject: req.body.subject,
        text: req.body.text,
    };

    try {
        const emailResponse = await transporter.sendMail(receiver);
        console.log("Email sent successfully:", emailResponse);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/emailForm.html'); 
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
