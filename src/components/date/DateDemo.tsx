import { useState, useEffect } from "react";
import { useTimezone } from "../../context/TimezoneContext";

type Row = { label: string; code: string; value: string };

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-indigo-700 mb-2">{title}</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-200">
            <th className="pb-1 w-36 font-normal">説明</th>
            <th className="pb-1 font-normal">コード</th>
            <th className="pb-1 font-normal">結果</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, code, value }) => (
            <tr key={label} className="border-b border-gray-100 last:border-0">
              <td className="py-1.5 text-gray-500 pr-4 align-top">{label}</td>
              <td className="py-1.5 font-mono text-indigo-600 pr-4 align-top whitespace-nowrap">
                {code}
              </td>
              <td className="py-1.5 font-mono text-gray-800 align-top">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function DateDemo() {
  const { timezone } = useTimezone();
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const past = new Date(2000, 0, 1);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const instantiation: Row[] = [
    { label: "現在日時", code: "new Date()", value: now.toString() },
    {
      label: "タイムスタンプ",
      code: "new Date(ms)",
      value: new Date(0).toISOString() + "  ← Unix epoch",
    },
    {
      label: "文字列から",
      code: 'new Date("2000-01-01")',
      value: new Date("2000-01-01").toISOString(),
    },
    {
      label: "年月日から",
      code: "new Date(2000, 0, 1)",
      value: new Date(2000, 0, 1).toDateString() + "  ← month は 0 始まり!",
    },
    { label: "現在のms", code: "Date.now()", value: String(Date.now()) },
  ];

  const getters: Row[] = [
    {
      label: "年",
      code: "now.getFullYear()",
      value: String(now.getFullYear()),
    },
    {
      label: "月",
      code: "now.getMonth()",
      value: `${now.getMonth()}  ← 0〜11（表示時は +1）`,
    },
    { label: "日", code: "now.getDate()", value: String(now.getDate()) },
    {
      label: "曜日",
      code: "now.getDay()",
      value: `${now.getDay()}  ← 0=日 〜 6=土`,
    },
    { label: "時", code: "now.getHours()", value: String(now.getHours()) },
    { label: "分", code: "now.getMinutes()", value: String(now.getMinutes()) },
    { label: "秒", code: "now.getSeconds()", value: String(now.getSeconds()) },
    {
      label: "タイムスタンプ",
      code: "now.getTime()",
      value: String(now.getTime()),
    },
  ];

  const formatting: Row[] = [
    { label: "ISO 8601", code: "now.toISOString()", value: now.toISOString() },
    { label: "UTC文字列", code: "now.toUTCString()", value: now.toUTCString() },
    {
      label: "日付のみ",
      code: 'now.toLocaleDateString("ja-JP")',
      value: now.toLocaleDateString("ja-JP"),
    },
    {
      label: "時刻のみ",
      code: 'now.toLocaleTimeString("ja-JP")',
      value: now.toLocaleTimeString("ja-JP"),
    },
    {
      label: "日時（ja）",
      code: 'now.toLocaleString("ja-JP")',
      value: now.toLocaleString("ja-JP"),
    },
    {
      label: "TZ指定",
      code: `now.toLocaleString("ja-JP", { timeZone: "${timezone}" })`,
      value: now.toLocaleString("ja-JP", { timeZone: timezone }),
    },
  ];

  const arithmetic: Row[] = [
    {
      label: "差分（ms）",
      code: "now.getTime() - past.getTime()",
      value: `${diffMs.toLocaleString()} ms`,
    },
    {
      label: "差分（日）",
      code: "diffMs / (1000*60*60*24)",
      value: `${diffDays.toLocaleString()} 日`,
    },
    {
      label: "30日後",
      code: "new Date(now.getTime() + 30*24*60*60*1000)",
      value: new Date(
        now.getTime() + 30 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("ja-JP"),
    },
    {
      label: "月末日",
      code: "new Date(year, month+1, 0).getDate()",
      value: `${new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()} 日`,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-7">
      <div>
        <h1 className="text-2xl font-bold text-indigo-700">
          new Date() 使い方まとめ
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          時刻は 1 秒ごとに更新 / TZ: {timezone}
        </p>
      </div>
      <Section title="インスタンス生成" rows={instantiation} />
      <Section title="ゲッター（ローカル時刻）" rows={getters} />
      <Section title="フォーマット" rows={formatting} />
      <Section title="日付の計算" rows={arithmetic} />
      <div>
        <h2 className="text-base font-semibold text-indigo-700 mb-2">
          ロケール対応Date+Intel
        </h2>
      </div>
    </div>
  );
}
