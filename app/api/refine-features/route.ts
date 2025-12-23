import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Features text is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `You are a professional email writing assistant. Convert the following technical features list into clear, simple language that non-technical people can easily understand. 
      
The features list should be formatted in proper Markdown with:
- Use simple, everyday language (avoid technical jargon and acronyms)
- Focus on benefits and what users will experience, not technical implementation
- Group related features under **bold category headings** (e.g., **Performance Improvements**, **New Features**, **Bug Fixes**)
- Use proper markdown bullet points (- for unordered lists)
- Use **bold** text to emphasize key improvements or features
- Be clear, concise, and well-structured
- Explain "what improved" rather than "how it was fixed"
- Be appropriate for an email to clients, stakeholders, or end users

Original technical features:
${prompt}

Refined markdown features list (return only the markdown-formatted text, no explanations):`,
    });

    return new Response(JSON.stringify({ completion: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error refining features:", error);
    return new Response(
      JSON.stringify({ error: "Failed to refine features" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
