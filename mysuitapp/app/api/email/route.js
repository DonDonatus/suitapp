import nodemailer from "nodemailer";
import { randomInt } from "crypto";

export async function POST(req) {
  const body = await req.json();
  const { fullname, email } = body;

  try {
    const genCode = randomInt(1000, 999999);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `SuitApp <obliepius13@gmail.com>`,
      to: email,
      subject: "Verification Code",
      text: `Hello ${fullname}, your verification code is: ${genCode} 
      please enter this code to verify your email address.
      if you did not request this code, please ignore this email.`,
    };

    const info = await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully!", code: genCode }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
