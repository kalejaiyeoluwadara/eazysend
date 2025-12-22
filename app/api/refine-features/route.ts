import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { features } = await req.json();

    if (!features || typeof features !== 'string') {
      return new Response(JSON.stringify({ error: 'Features text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      prompt: `You are a professional email writing assistant. Refine the following deployment features list to make it more professional, clear, and well-structured. 
      
The features list should:
- Be concise and professional
- Use proper bullet point formatting (each feature on a new line with a bullet)
- Be clear and specific about what was fixed or updated
- Maintain the original meaning and technical details
- Be appropriate for a deployment email to a technical team

Original features list:
${features}

Refined features list (return only the refined text, no explanations or additional text):`,
      maxTokens: 1000,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Error refining features:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to refine features' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

