const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {
    let FROM_EMAIL = process.env.FROM_EMAIL;
    let EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: FROM_EMAIL,
            pass: EMAIL_PASSWORD
        }
    });


    let mailOptions = {
        from: 'Task Manager  <FROM_EMAIL>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility