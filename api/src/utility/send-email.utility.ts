import nodemailer, { Transporter } from 'nodemailer';

const SendEmailUtility = async (EmailTo: string, EmailText: string, EmailSubject: string): Promise<void> => {
    let FROM_EMAIL = process.env.FROM_EMAIL;
    let EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

    let transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: FROM_EMAIL,
            pass: EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: 'Task Manager <' + FROM_EMAIL + '>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
    };

    await transporter.sendMail(mailOptions);
};

export default SendEmailUtility;
