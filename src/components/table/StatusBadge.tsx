// StatusBadge.tsx
// Presentation コンポーネント: ステータス値を受け取り、対応した色のバッジを描画する
// ロジックを持たず、スタイリングのみを担当する

import type { Status } from '../../types/person'

// ステータスごとの表示ラベル（日本語）
const STATUS_LABEL: Record<Status, string> = {
  active:  '在籍中',
  retired: '退職',
  leave:   '休職',
}

// ステータスごとの Tailwind クラス（背景色・文字色）
const STATUS_CLASS: Record<Status, string> = {
  active:  'bg-green-100 text-green-800',  // 在籍中: 緑系
  retired: 'bg-gray-100 text-gray-600',    // 退職: グレー系（非活性な印象）
  leave:   'bg-yellow-100 text-yellow-800', // 休職: 黄色系（注意を引く）
}

type Props = {
  status: Status // 表示するステータス値
}

// バッジ本体: 丸みのある小さいタグ風のUI
export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        rounded-full
        text-xs font-medium
        ${STATUS_CLASS[status]}
      `}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
