import nodemailer from "nodemailer";
import { randomInt } from "crypto";

export async function POST(req) {
  const body = await req.json();
  const { fullname, email } = body;

  try {
    const genCode = randomInt(1000, 9999);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your Gmail email address
        pass: process.env.PASSWORD, // App password for Gmail
      },
    });

    const mailOptions = {
      from: `SuitApp <obliepius13@gmail.com>`,
      to: email,
      subject: "Verification Code",
      text: `Hello ${fullname}, your verification code is: ${genCode}`,
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
