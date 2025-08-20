import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  if (!location)
    return NextResponse.json({ error: "Missing location" }, { status: 400 });

  const apiKey = process.env.OPENWEATHER_KEY!;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
  );
  const data = await res.json();

  return NextResponse.json({
    location: data.name,
    temp: data.main.temp,
    condition: data.weather[0].description,
  });
}
