import { useState, useEffect } from "react";
import { useTimezone } from "../context/TimezoneContext";
import { TIMEZONE_LOCALE_MAP, DEFAULT_LOCALE } from "../utils/timezoneLocaleMap";

export function DateDemoPage() {
  const { timezone } = useTimezone();
  const [now, setNow] = useState<Date>(() => new Date());
  const locale = TIMEZONE_LOCALE_MAP[timezone] ?? DEFAULT_LOCALE;

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const intlFormats: { label: string; options: Intl.DateTimeFormatOptions }[] = [
    { label: "日時（フル）", options: { dateStyle: "full", timeStyle: "long", timeZone: timezone } },
    { label: "日付のみ",     options: { dateStyle: "long", timeZone: timezone } },
    { label: "時刻のみ",     options: { timeStyle: "medium", timeZone: timezone } },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700">Date API デモ</h1>
      <p className="text-sm text-gray-500">
        JavaScript の <code className="bg-gray-100 px-1 rounded">Date</code> と{" "}
        <code className="bg-gray-100 px-1 rounded">Intl.DateTimeFormat</code>{" "}
        だけを使ったタイムゾーン対応の時刻表示例です。
      </p>
      <div className="text-sm text-gray-600">
        現在のタイムゾーン:{" "}
        <span className="font-mono font-semibold text-indigo-600">{timezone}</span>
        &nbsp;/&nbsp; ロケール:{" "}
        <span className="font-mono font-semibold text-indigo-600">{locale}</span>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Intl.DateTimeFormat</h2>
        <div className="space-y-3">
          {intlFormats.map(({ label, options }) => (
            <div key={label} className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <span className="w-28 text-xs text-gray-400 shrink-0">{label}</span>
              <span className="font-mono text-gray-800">
                {new Intl.DateTimeFormat(locale, options).format(now)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">toLocaleString 系</h2>
        <div className="space-y-3">
          <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
            <span className="w-28 text-xs text-gray-400 shrink-0">日時</span>
            <span className="font-mono text-gray-800">
              {now.toLocaleString(locale, { timeZone: timezone })}
            </span>
          </div>
          <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
            <span className="w-28 text-xs text-gray-400 shrink-0">日付のみ</span>
            <span className="font-mono text-gray-800">
              {now.toLocaleDateString(locale, { timeZone: timezone })}
            </span>
          </div>
          <div className="flex items-baseline gap-4 pb-2">
            <span className="w-28 text-xs text-gray-400 shrink-0">時刻のみ</span>
            <span className="font-mono text-gray-800">
              {now.toLocaleTimeString(locale, { timeZone: timezone })}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
