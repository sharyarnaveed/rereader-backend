const nodemailer = require("nodemailer");
require("dotenv").config();

const sendopt=async(otp,email)=>
{
try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
    
      const info = await transporter.sendMail({
        from: process.env.SENDER_ADDRESS, // sender address
        to: email, // list of receivers
        replyTo: email, // reply-to address
        subject: "Account Verification", // Subject line
        text: `Your Otp For Verification Is ${otp}`, // plain text body
      });

     
      return true
    
} catch (error) {
    console.log("error in sending otp",error);
    
}
}

module.exports={sendopt}