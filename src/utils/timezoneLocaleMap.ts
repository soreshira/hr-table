export const TIMEZONE_LOCALE_MAP: Record<string, string> = {
  "Asia/Tokyo": "ja-JP",
  "America/New_York": "en-US",
  "America/Chicago": "en-US",
  "America/Denver": "en-US",
  "America/Los_Angeles": "en-US",
  "Europe/London": "en-GB",
  "Europe/Paris": "fr-FR",
  "Europe/Berlin": "de-DE",
  "Europe/Rome": "it-IT",
  "Europe/Madrid": "es-ES",
  "Asia/Shanghai": "zh-CN",
  "Asia/Hong_Kong": "zh-HK",
  "Asia/Seoul": "ko-KR",
  "Asia/Singapore": "en-SG",
  "Asia/Kolkata": "hi-IN",
  "Australia/Sydney": "en-AU",
  "Pacific/Auckland": "en-NZ",
  "America/Sao_Paulo": "pt-BR",
};

export const DEFAULT_LOCALE = "en-US";
export const DEFAULT_TIMEZONE = "Asia/Tokyo";

export const TIMEZONE_OPTIONS: { label: string; value: string }[] = [
  { label: "東京 (UTC+9)", value: "Asia/Tokyo" },
  { label: "ニューヨーク (UTC-5/-4)", value: "America/New_York" },
  { label: "シカゴ (UTC-6/-5)", value: "America/Chicago" },
  { label: "デンバー (UTC-7/-6)", value: "America/Denver" },
  { label: "ロサンゼルス (UTC-8/-7)", value: "America/Los_Angeles" },
  { label: "ロンドン (UTC+0/+1)", value: "Europe/London" },
  { label: "パリ (UTC+1/+2)", value: "Europe/Paris" },
  { label: "ベルリン (UTC+1/+2)", value: "Europe/Berlin" },
  { label: "ローマ (UTC+1/+2)", value: "Europe/Rome" },
  { label: "マドリード (UTC+1/+2)", value: "Europe/Madrid" },
  { label: "上海 (UTC+8)", value: "Asia/Shanghai" },
  { label: "香港 (UTC+8)", value: "Asia/Hong_Kong" },
  { label: "ソウル (UTC+9)", value: "Asia/Seoul" },
  { label: "シンガポール (UTC+8)", value: "Asia/Singapore" },
  { label: "ムンバイ (UTC+5:30)", value: "Asia/Kolkata" },
  { label: "シドニー (UTC+10/+11)", value: "Australia/Sydney" },
  { label: "オークランド (UTC+12/+13)", value: "Pacific/Auckland" },
  { label: "サンパウロ (UTC-3)", value: "America/Sao_Paulo" },
];
