export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY;
  return Response.json({ ok: hasKey });
}
