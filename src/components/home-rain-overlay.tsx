"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const RAIN_PENDING_KEY = "home-rain-overlay-pending";

export function HomeRainOverlay() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  const drops = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        left: `${((i * 17) % 100) + 1}%`,
        duration: `${0.4 + ((i * 19) % 18) / 20}s`,
        delay: `${((i * 5) % 20) / 20}s`,
      })),
    []
  );

  useEffect(() => {
    const activate = () => {
      if (pathname !== "/") return;

      setActive(true);
      sessionStorage.removeItem(RAIN_PENDING_KEY);

      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setActive(false);
        timerRef.current = null;
      }, 3200);
    };

    const onTrigger = () => activate();

    window.addEventListener("home-rain-trigger", onTrigger as EventListener);

    if (sessionStorage.getItem(RAIN_PENDING_KEY) === "1") {
      activate();
    }

    return () => {
      window.removeEventListener("home-rain-trigger", onTrigger as EventListener);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [pathname]);

  if (!active || pathname !== "/") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {drops.map((drop, idx) => (
        <span
          key={idx}
          className="absolute top-[-10%] h-6 w-[1.5px] bg-sky-300/80 dark:bg-sky-200/70"
          style={{
            left: drop.left,
            animation: `rain-fall ${drop.duration} linear ${drop.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
