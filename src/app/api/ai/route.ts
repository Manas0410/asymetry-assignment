// app/api/ai/route.ts
import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { getWeather, getF1NextRace, getStockPrice } from "@/lib/tools";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"), // swap models if you want
    messages,
    system:
      "You are a helpful assistant. Use tools when asked about weather, F1 next race, or stock price. " +
      "When you call a tool, summarize the result clearly for the user.",
    tools: {
      getWeather: tool({
        description: "Get current weather for a city",
        parameters: z.object({ location: z.string().min(1) }),
        // @ts-ignore
        execute: async ({ location }) => await getWeather(location),
      }),
      getF1Matches: tool({
        description: "Get the next upcoming Formula 1 race",
        parameters: z.object({}),
        // @ts-ignore
        execute: async () => await getF1NextRace(),
      }),
      getStockPrice: tool({
        description: "Get current stock price for a symbol",
        parameters: z.object({ symbol: z.string().min(1) }),
        // @ts-ignore
        execute: async ({ symbol }) => await getStockPrice(symbol),
      }),
    },
  });

  return result.toTextStreamResponse();
}
