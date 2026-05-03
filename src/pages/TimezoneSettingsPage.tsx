import { DateTime } from "luxon";
import { useTimezone } from "../context/TimezoneContext";
import { TIMEZONE_OPTIONS } from "../utils/timezoneLocaleMap";
import { getLocaleForTimezone } from "../utils/formatDateTime";
import { useCurrentTime } from "../hooks/useCurrentTime";

export function TimezoneSettingsPage() {
  const { timezone, setTimezone } = useTimezone();
  const now = useCurrentTime(timezone);
  const locale = getLocaleForTimezone(timezone);

  return (
    <div className="max-w-xl mx-auto space-y-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">タイムゾーン設定</h1>
        <p className="mt-1 text-sm text-gray-500">
          タイムゾーンを変更すると、全ページの日時表示に反映されます。
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">タイムゾーン</span>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {TIMEZONE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <div className="text-xs text-gray-400 space-y-0.5">
          <p>IANAタイムゾーン: <code className="font-mono">{timezone}</code></p>
          <p>ロケール: <code className="font-mono">{locale}</code></p>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-indigo-700">表示プレビュー</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500 shrink-0">DATETIME_FULL</span>
            <span className="font-medium text-right">
              {now.setLocale(locale).toLocaleString(DateTime.DATETIME_FULL)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500 shrink-0">DATE_FULL</span>
            <span className="font-medium text-right">
              {now.setLocale(locale).toLocaleString(DateTime.DATE_FULL)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500 shrink-0">DATETIME_MED</span>
            <span className="font-medium text-right">
              {now.setLocale(locale).toLocaleString(DateTime.DATETIME_MED)}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
