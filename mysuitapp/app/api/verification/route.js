import { User, dbconnect } from "../users/route.js";

export async function POST(req) {
  try {
    const { code } = await req.json(); // Receive only the code from the body
    const url = new URL(req.url); // Get the URL from the request
    const email = url.searchParams.get("email"); // Extract the email from query params

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }

    await dbconnect(); // Connect to the database

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return new Response(
        JSON.stringify({ message: "User is already verified" }),
        { status: 400 }
      );
    }

    // Check if the code matches the one stored in the database
    if (user.genCode === code) {
      // Update the user's isVerified field to true
      user.isVerified = true;
      await user.save(); // Save the updated user data

      return new Response(
        JSON.stringify({ message: "User verified successfully!" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid verification code" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during verification:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
