import { GoogleGenAI } from "@google/genai";
import { buildSystemInstruction } from "@/lib/systemPrompt";

export const runtime = "nodejs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Simple in-memory rate limiting (10 requests/minute per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  const record = rateLimitMap.get(ip);
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// Cleanup stale entries occasionally to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS * 5);


async function withRetry(fn, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isRateLimit = err?.status === 429;
      if (isRateLimit && attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Retry attempts exhausted");
}

export async function POST(req) {
  try {
    // Determine IP for rate limiting
    // Fallback order: X-Forwarded-For -> Remote address
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown-ip";
    
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string" || message.length > 1000) {
      return Response.json({ error: "Invalid message" }, { status: 400 });
    }

    const result = await withRetry(() =>
      ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: [...history, { role: "user", parts: [{ text: message }] }],
        config: {
          systemInstruction: buildSystemInstruction(),
          temperature: 0.4,
          maxOutputTokens: 300,
        },
      })
    );

    return Response.json({ reply: result.text });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      {
        reply: "Sorry, I'm having trouble right now. Please reach us directly on WhatsApp and our team will be happy to help!\n\nwa.me/905060453906",
      },
      { status: 200 } // 200 so the widget renders the fallback text gracefully instead of a generic error state
    );
  }
}
