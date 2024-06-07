import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const frontendUrl = process.env.FRONTEND_URL!;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendMail = async (
  transporter: any,
  recieverEmail: string,
  fullname: string,
  tempOTP: number,
): Promise<void> => {
  const mailOptions = {
    from: {
      name: "virtual carrier fair",
      address: process.env.EMAIL_SENDER_ADDRESS,
    },
    to: recieverEmail,
    subject: "Email Verification",
    text: "This is a test email",
    html: `<P>Dear ${fullname},</P>
    <P>You have registered to our system.</P>
    <P>Here is your OTP: ${tempOTP}</P>
    <P>Best Regards,</P>
    <P>Team virtual carrier fair</P>
    `,
  };

  await new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error != null) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
