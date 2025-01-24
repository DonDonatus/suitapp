import mongoose from "mongoose";
const mongUrl = process.env.MONGO_URL;

// Define the schema
const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
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

  // Parse the request body
  const body = await req.json(); // Await is necessary here
  const { fullname, email, password } = body;

  // Validate required fields
  if (!fullname || !email || !password) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  try {
    // Save the new user
    const user1 = new User({ fullname, email, password });
    await user1.save();

    return new Response(
      JSON.stringify({ message: "User created successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    // Handle duplicate user error
    if (error.code === 11000) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    // General error handling
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
