// lib/tools.ts
type WeatherOut = { location: string; tempC: number; description: string };
type F1Out = { raceName: string; circuit: string; date: string; time?: string };
type StockOut = { symbol: string; price: string; changePercent?: string };

export async function getWeather(location: string): Promise<WeatherOut> {
  const key = process.env.OPENWEATHER_API_KEY!;
  if (!key) throw new Error("Missing OPENWEATHER_API_KEY");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    location
  )}&appid=${key}&units=metric`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
  const data = await res.json();

  return {
    location: data?.name ?? location,
    tempC: data?.main?.temp,
    description: data?.weather?.[0]?.description ?? "unknown",
  };
}

export async function getF1NextRace(): Promise<F1Out> {
  const url = `https://ergast.com/api/f1/current/next.json`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`F1 fetch failed: ${res.status}`);
  const data = await res.json();
  const race = data?.MRData?.RaceTable?.Races?.[0];
  if (!race) throw new Error("No upcoming race found");
  return {
    raceName: race.raceName,
    circuit: race.Circuit?.circuitName,
    date: race.date,
    time: race.time,
  };
}

export async function getStockPrice(symbol: string): Promise<StockOut> {
  const key = process.env.ALPHA_VANTAGE_API_KEY!;
  if (!key) throw new Error("Missing ALPHA_VANTAGE_API_KEY");

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
    symbol
  )}&apikey=${key}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Stock fetch failed: ${res.status}`);
  const data = await res.json();
  const q = data?.["Global Quote"] ?? {};

  if (!q["05. price"]) throw new Error("Invalid symbol or API limit");

  return {
    symbol: q["01. symbol"] ?? symbol.toUpperCase(),
    price: q["05. price"],
    changePercent: q["10. change percent"],
  };
}
