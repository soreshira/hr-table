import { DateTime } from "luxon";
import { TIMEZONE_LOCALE_MAP, DEFAULT_LOCALE } from "./timezoneLocaleMap";

export function getLocaleForTimezone(timezone: string): string {
  return TIMEZONE_LOCALE_MAP[timezone] ?? DEFAULT_LOCALE;
}

export function formatDateTime(dt: DateTime, timezone: string): string {
  const locale = getLocaleForTimezone(timezone);
  return dt
    .setZone(timezone)
    .setLocale(locale)
    .toLocaleString(DateTime.DATETIME_MED);
}

// UTC日時をタイムゾーンに応じたローカル日時に変換してフォーマットする
export function formatUtcToLocale(
  utcDateStr: string,
  format: string,
  timezone: string,
): string {
  return new Date(utcDateStr).toLocaleString(format, { timeZone: timezone });
}
