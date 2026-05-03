import { NavLink } from "react-router-dom";
import { DateTime } from "luxon";
import { useTimezone } from "../../context/TimezoneContext";
import { useCurrentTime } from "../../hooks/useCurrentTime";
import { getLocaleForTimezone } from "../../utils/formatDateTime";

export function AppHeader() {
  const { timezone } = useTimezone();
  const now = useCurrentTime(timezone);
  const locale = getLocaleForTimezone(timezone);

  const formattedTime = now
    .setLocale(locale)
    .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
      : "text-gray-600 hover:text-indigo-500 pb-1";

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className="text-xl font-bold text-indigo-700">HR Table</span>

          <nav className="flex gap-6 text-sm">
            <NavLink to="/" end className={navLinkClass}>
              従業員一覧
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              タイムゾーン設定
            </NavLink>
            <NavLink to="/date-demo" className={navLinkClass}>
              Date API デモ
            </NavLink>
            <NavLink to="/datedemo" className={navLinkClass}>
              Date vs Luxon
            </NavLink>
          </nav>

          <div className="text-right text-sm">
            <div className="font-mono text-gray-800">{formattedTime}</div>
            <div className="text-xs text-gray-400">{timezone}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
