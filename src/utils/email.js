import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendResetPasswordEmail = async (to, token) => {
  const url = token;

  await transporter.sendMail({
    from: `"HabitFlow" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Restablecer tu contraseña",
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${url}">${url}</a>
           <p>Este enlace expira en 1 hora.</p>`
  });
};
