export async function POST(req) {
  const body = await req.json();
  const { fullname, email } = body;

  try {
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
