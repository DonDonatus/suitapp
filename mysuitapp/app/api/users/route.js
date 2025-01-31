import mongoose from "mongoose";
const mongUrl = process.env.MONGO_URL;
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";

// Define the schema
const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
  isVerified: { type: Boolean, default: false },
  genCode: { type: String },
});

// Create or reuse the model
const User = mongoose.models.suitUser || mongoose.model("suitUser", userSchema);

// Function to connect to the database
async function dbconnect() {
  try {
    if (mongoose.connections[0].readyState) return; // Avoid duplicate connections
    await mongoose.connect(mongUrl, {});
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

// Handle POST requests
export async function POST(req) {
  await dbconnect();
  const genCode = randomInt(1000, 999999);
  const body = await req.json();
  const { fullname, email, password } = body;

  if (!fullname || !email || !password) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user1 = new User({
      fullname,
      email,
      password: hashedPassword,
      isVerified: false,
      genCode: genCode,
    });
    console.log(user1);
    await user1.save();

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
      JSON.stringify({ message: "User created successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

export { User, dbconnect };
