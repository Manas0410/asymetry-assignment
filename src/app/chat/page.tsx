// @ts-nocheck
"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { WeatherCard, F1Card, StockCard } from "@/components/tool-card";

export default function ChatPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    api: "/api/ai",
  });

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col p-4">
      <h1 className="mb-4 text-2xl font-bold">AI Assistant</h1>

      <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl border p-4">
        {messages.map((m) => (
          <div key={m.id} className="space-y-2">
            <div
              className={m.role === "user" ? "text-blue-600" : "text-gray-900"}
            >
              <strong>{m.role === "user" ? "You" : "Assistant"}:</strong>{" "}
              {/* render text parts */}
              {m.parts?.map((part: any, i: number) => {
                if (part.type === "text")
                  return <span key={i}>{part.text}</span>;
                return null;
              })}
            </div>

            {/* render tool UI parts */}
            <div className="space-y-2">
              {m.parts?.map((part: any, i: number) => {
                // Weather
                if (part.type === "tool-getWeather") {
                  if (part.state === "input-available") {
                    return <div key={i}>Fetching weather…</div>;
                  }
                  if (part.state === "output-available") {
                    return <WeatherCard key={i} {...part.output} />;
                  }
                  if (part.state === "output-error") {
                    return (
                      <div key={i} className="text-red-600">
                        Weather error: {part.errorText}
                      </div>
                    );
                  }
                }

                // F1
                if (part.type === "tool-getF1Matches") {
                  if (part.state === "input-available") {
                    return <div key={i}>Fetching next F1 race…</div>;
                  }
                  if (part.state === "output-available") {
                    return <F1Card key={i} {...part.output} />;
                  }
                  if (part.state === "output-error") {
                    return (
                      <div key={i} className="text-red-600">
                        F1 error: {part.errorText}
                      </div>
                    );
                  }
                }

                // Stock
                if (part.type === "tool-getStockPrice") {
                  if (part.state === "input-available") {
                    return <div key={i}>Fetching stock price…</div>;
                  }
                  if (part.state === "output-available") {
                    return <StockCard key={i} {...part.output} />;
                  }
                  if (part.state === "output-error") {
                    return (
                      <div key={i} className="text-red-600">
                        Stock error: {part.errorText}
                      </div>
                    );
                  }
                }

                return null;
              })}
            </div>
          </div>
        ))}

        {error && <div className="text-red-600">Error: {error.message}</div>}
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-xl border p-3 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about weather (city), next F1 race, or stock price (e.g., AAPL)"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-black px-4 py-3 text-white disabled:opacity-50"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
