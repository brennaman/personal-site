"use client";

import { Cloud, CloudRain, CloudSun, Loader2, Sun } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type WeatherData = {
  temperature: number;
  precipitationProbability: number;
  humidity: number;
  windMph: number;
  weatherCode: number;
  isDay: number;
};

const MARIETTA_LABEL = "Marietta, GA";
const RAIN_SESSION_KEY = "home-rain-overlay-played";
const SECRET_CODE = "rain";

function isRainCode(code: number): boolean {
  return [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code);
}

function pickIcon(code: number, isDay: number) {
  if (isRainCode(code)) return CloudRain;
  if (code === 0 && isDay === 1) return Sun;
  if (code === 0 && isDay === 0) return Cloud;
  if ([1, 2].includes(code)) return CloudSun;
  return Cloud;
}

function RainOverlay({ active }: { active: boolean }) {
  const drops = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        left: `${((i * 31) % 100) + 1}%`,
        duration: `${0.45 + ((i * 13) % 12) / 20}s`,
        delay: `${((i * 7) % 10) / 20}s`,
      })),
    []
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl" aria-hidden>
      {drops.map((drop, idx) => (
        <span
          key={idx}
          className="absolute top-[-20%] h-4 w-[1.5px] bg-sky-300/80 dark:bg-sky-200/70"
          style={{
            left: drop.left,
            animation: `rain-fall ${drop.duration} linear ${drop.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function HomeWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rainOverlay, setRainOverlay] = useState(false);
  const rainTimerRef = useRef<number | null>(null);

  const triggerRain = useCallback(() => {
    setRainOverlay(true);
    if (rainTimerRef.current) {
      window.clearTimeout(rainTimerRef.current);
    }
    rainTimerRef.current = window.setTimeout(() => {
      setRainOverlay(false);
      rainTimerRef.current = null;
    }, 3200);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=33.9526&longitude=-84.5499&current=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,weather_code,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York";
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        if (!response.ok) return;

        const payload = await response.json();
        const current = payload?.current;
        if (!current) return;

        const weather: WeatherData = {
          temperature: Number(current.temperature_2m ?? 0),
          precipitationProbability: Number(current.precipitation_probability ?? 0),
          humidity: Number(current.relative_humidity_2m ?? 0),
          windMph: Number(current.wind_speed_10m ?? 0),
          weatherCode: Number(current.weather_code ?? 0),
          isDay: Number(current.is_day ?? 1),
        };

        setData(weather);

        if (isRainCode(weather.weatherCode) && typeof window !== "undefined") {
          const played = sessionStorage.getItem(RAIN_SESSION_KEY) === "1";
          if (!played) {
            triggerRain();
            sessionStorage.setItem(RAIN_SESSION_KEY, "1");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    void load();
    return () => controller.abort();
  }, [triggerRain]);

  useEffect(() => {
    let buffer = "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.length !== 1) return;

      buffer = `${buffer}${event.key.toLowerCase()}`.slice(-SECRET_CODE.length);
      if (buffer === SECRET_CODE) {
        triggerRain();
        buffer = "";
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [triggerRain]);

  useEffect(() => {
    return () => {
      if (rainTimerRef.current) {
        window.clearTimeout(rainTimerRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card/80 p-4 max-w-xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading weather for {MARIETTA_LABEL}…
        </div>
      </div>
    );
  }

  if (!data) return null;

  const WeatherIcon = pickIcon(data.weatherCode, data.isDay);

  return (
    <div className="relative rounded-xl border border-border bg-card/80 p-4 max-w-xl overflow-hidden">
      <RainOverlay active={rainOverlay} />
      <div className="relative flex items-center gap-4">
        <WeatherIcon className="size-12 text-muted-foreground shrink-0" />

        <div className="flex items-end gap-2">
          <span className="text-5xl font-semibold leading-none">{Math.round(data.temperature)}</span>
          <span className="text-2xl text-muted-foreground leading-none pb-1">°F</span>
        </div>

        <div className="text-muted-foreground text-sm sm:text-base leading-snug ml-auto">
          <p>Precipitation: {Math.round(data.precipitationProbability)}%</p>
          <p>Humidity: {Math.round(data.humidity)}%</p>
          <p>Wind: {Math.round(data.windMph)} mph</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground/80">{MARIETTA_LABEL}</p>
    </div>
  );
}
