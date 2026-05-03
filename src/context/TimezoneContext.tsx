import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { DEFAULT_TIMEZONE } from "../utils/timezoneLocaleMap";

const STORAGE_KEY = "hr-table-timezone";

type TimezoneContextType = {
  timezone: string;
  setTimezone: (tz: string) => void;
};

const TimezoneContext = createContext<TimezoneContextType | null>(null);

export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [timezone, setTimezoneState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_TIMEZONE;
  });

  const setTimezone = useCallback((tz: string) => {
    localStorage.setItem(STORAGE_KEY, tz);
    setTimezoneState(tz);
  }, []);

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone(): TimezoneContextType {
  const ctx = useContext(TimezoneContext);
  if (!ctx) {
    throw new Error("useTimezone must be used within a TimezoneProvider");
  }
  return ctx;
}
