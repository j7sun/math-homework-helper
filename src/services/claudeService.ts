import { Platform } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
// On web, route through local proxy to avoid CORS. On native, call Anthropic directly.
const API_URL =
  Platform.OS === "web"
    ? "http://localhost:3001/api/solve"
    : "https://api.anthropic.com/v1/messages";

export interface MathSolution {
  answer: string;
  breakdown: string;
  concepts: string;
  rawText: string;
}

const SYSTEM_PROMPT = `You are an expert math tutor and problem solver with deep knowledge across all areas of mathematics — arithmetic, algebra, geometry, trigonometry, calculus, statistics, linear algebra, and beyond.

When given an image of a math problem or homework:
1. Identify every question or problem visible in the image.
2. Provide the correct final answer(s) clearly.
3. Give a thorough, step-by-step solution breakdown explaining every step.
4. Cite every formula, theorem, or mathematical concept you apply.
5. Use clear notation. For fractions write them as a/b, for powers write x^2, for square roots write sqrt(x).

Format your response EXACTLY like this:

ANSWER:
[Final answer(s) — be concise and clear]

SOLUTION BREAKDOWN:
[Numbered step-by-step solution. Each step should explain both what you are doing and why.]

CONCEPTS USED:
[Bullet list of mathematical concepts, formulas, or theorems applied]`;

export async function solveMathProblem(
  base64Image: string,
  mimeType: string = "image/jpeg"
): Promise<MathSolution> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  // On native, send key directly. On web the proxy injects it server-side.
  if (Platform.OS !== "web") {
    if (!API_KEY) throw new Error("Anthropic API key is not configured.");
    headers["x-api-key"] = API_KEY;
    headers["anthropic-version"] = "2023-06-01";
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType,
                data: base64Image,
              },
            },
            {
              type: "text",
              text: "Please solve all the math problems shown in this image. Provide the final answer and a complete step-by-step breakdown.",
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as any)?.error?.message || `API request failed (${response.status})`
    );
  }

  const data = await response.json();
  const rawText: string =
    data.content?.find((b: any) => b.type === "text")?.text ?? "";

  const answerMatch = rawText.match(/ANSWER:\s*([\s\S]*?)(?=\n\nSOLUTION BREAKDOWN:)/i);
  const breakdownMatch = rawText.match(/SOLUTION BREAKDOWN:\s*([\s\S]*?)(?=\n\nCONCEPTS USED:)/i);
  const conceptsMatch = rawText.match(/CONCEPTS USED:\s*([\s\S]*?)$/i);

  return {
    answer: answerMatch?.[1]?.trim() ?? "See solution below",
    breakdown: breakdownMatch?.[1]?.trim() ?? rawText,
    concepts: conceptsMatch?.[1]?.trim() ?? "",
    rawText,
  };
}
