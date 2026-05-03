import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export function useCurrentTime(timezone: string): DateTime {
  const [now, setNow] = useState(() => DateTime.now().setZone(timezone));

  useEffect(() => {
    setNow(DateTime.now().setZone(timezone));

    const timer = setInterval(() => {
      setNow(DateTime.now().setZone(timezone));
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  return now;
}
