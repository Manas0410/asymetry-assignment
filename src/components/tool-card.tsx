export function WeatherCard(props: {
  location: string;
  tempC: number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <div className="text-sm text-muted-foreground">Weather</div>
      <div className="mt-1 text-lg font-semibold">{props.location}</div>
      <div className="mt-2 text-2xl">{Math.round(props.tempC)}°C</div>
      <div className="text-sm capitalize">{props.description}</div>
    </div>
  );
}

export function F1Card(props: {
  raceName: string;
  circuit: string;
  date: string;
  time?: string;
}) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <div className="text-sm text-muted-foreground">Next F1 Race</div>
      <div className="mt-1 text-lg font-semibold">{props.raceName}</div>
      <div className="mt-1 text-sm">{props.circuit}</div>
      <div className="mt-2 text-sm">
        {props.date}
        {props.time ? ` • ${props.time}` : ""}
      </div>
    </div>
  );
}

export function StockCard(props: {
  symbol: string;
  price: string;
  changePercent?: string;
}) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <div className="text-sm text-muted-foreground">Stock</div>
      <div className="mt-1 text-lg font-semibold">{props.symbol}</div>
      <div className="mt-2 text-2xl">${Number(props.price).toFixed(2)}</div>
      {props.changePercent && (
        <div className="text-sm">{props.changePercent}</div>
      )}
    </div>
  );
}
