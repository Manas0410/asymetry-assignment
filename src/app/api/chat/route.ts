// app/api/ai/route.ts
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, tool } from "ai";
import { getWeather, getF1NextRace, getStockPrice } from "@/lib/tools";

export const runtime = "edge";

// Ensure your tools return the exact props your cards expect:
// getWeather -> { location: string; tempC: number; description: string }
// getF1NextRace -> { raceName: string; circuit: string; date: string; time?: string }
// getStockPrice -> { symbol: string; price: string; changePercent?: string }

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: any[] };

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system:
      "You are a helpful assistant. Use tools for weather, next F1 race, or stock price and then summarize the results clearly.",
    messages: convertToModelMessages(messages),

    tools: {
      getWeather: tool({
        description: "Get current weather for a city",
        inputSchema: z.object({ location: z.string().min(1) }),
        execute: async ({ location }) => {
          return await getWeather(location);
        },
      }),

      getF1Matches: tool({
        description: "Get the next upcoming Formula 1 race",
        inputSchema: z.object({}), // no input needed
        execute: async () => {
          return await getF1NextRace();
        },
      }),

      getStockPrice: tool({
        description: "Get current stock price for a symbol",
        inputSchema: z.object({ symbol: z.string().min(1) }),
        execute: async ({ symbol }) => {
          return await getStockPrice(symbol);
        },
      }),
    },
  });

  // IMPORTANT: return UI message stream for v5 (tools + parts)
  return result.toUIMessageStreamResponse();
}
