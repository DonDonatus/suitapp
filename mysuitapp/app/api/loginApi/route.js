import { User, dbconnect } from "../users/route.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers.js";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbconnect();
  const body = await req.json();
  const { email, password } = body;

  try {
    const user = await User.findOne({ email });
    // check existence of user
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "Can't find your account, probably haven't registered",
        }),
        {
          status: 401,
        }
      );
    }
    // check if user is verified
    if (user.isVerified === false) {
      return new Response(
        JSON.stringify({ message: "Please verify your email" }),
        {
          status: 401,
        }
      );
    }

    // check if password is a match
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      console.log("Password is a match");

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      const cookiesJar = cookies();
      (await cookiesJar).set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      return new Response(JSON.stringify({ message: "Logged in" }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
