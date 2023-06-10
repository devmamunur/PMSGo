import nodemailer, { Transporter } from 'nodemailer';
import { envConfig } from '../config/env.config';

const SendEmailUtility = async (EmailTo: string, EmailText: string, EmailSubject: string): Promise<void> => {
  const FROM_EMAIL = envConfig.FROM_EMAIL;
  const EMAIL_PASSWORD = envConfig.EMAIL_PASSWORD;

  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: FROM_EMAIL,
      pass: EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Task Manager <' + FROM_EMAIL + '>',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText
  };

  await transporter.sendMail(mailOptions);
};

export default SendEmailUtility;
