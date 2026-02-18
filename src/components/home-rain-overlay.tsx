"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export function HomeRainOverlay() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

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
    const onTrigger = () => {
      if (pathname !== "/") return;

      setActive(true);
      window.setTimeout(() => setActive(false), 3200);
    };

    window.addEventListener("home-rain-trigger", onTrigger as EventListener);
    return () => window.removeEventListener("home-rain-trigger", onTrigger as EventListener);
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
