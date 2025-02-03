import jwt from "jsonwebtoken";

export async function GET(req) {
  const cookiesJar = req.cookies;
  const token = cookiesJar.get("token");

  if (!token) {
    console.log("No token found");
  }

  try {
    const decodor = jwt.verify(token.value, process.env.JWT_SECRET);
    return new Response(JSON.stringify({ loggedIn: true, user: decodor }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ loggedIn: false }), { status: 401 });
  }
}
