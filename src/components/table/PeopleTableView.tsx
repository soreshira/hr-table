// PeopleTableView.tsx
// Presentation コンポーネント: TanStack Table インスタンスを受け取り、HTMLテーブルとして描画する
// ロジック・状態管理は一切持たず、Props から受け取った table の描画に専念する

import { flexRender, type Table } from '@tanstack/react-table' // flexRender: セル内容を React 要素に変換するユーティリティ
import type { Person } from '../../types/person'
import { StatusBadge } from './StatusBadge'

type Props = {
  table: Table<Person> // usePeopleTable フックが返す TanStack Table インスタンス
}

export function PeopleTableView({ table }: Props) {
  return (
    // テーブル全体のラッパー: 横スクロール対応のために overflow-x-auto で囲む
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">

        {/* ── ヘッダー ── */}
        <thead className="bg-gray-50">
          {/* getHeaderGroups(): 列グループ（入れ子ヘッダーにも対応）を返す。今回は1段 */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="
                    px-6 py-3
                    text-left text-xs font-semibold
                    text-gray-500 uppercase tracking-wider
                    whitespace-nowrap
                  "
                >
                  {/* isPlaceholder: 結合セルのプレースホルダーの場合は何も描画しない */}
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header, // 列定義の header フィールドを描画
                        header.getContext(),            // 描画に必要なコンテキスト情報
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* ── ボディ ── */}
        <tbody className="bg-white divide-y divide-gray-100">
          {/* getRowModel().rows: 現在のフィルタ・ソート・ページを適用した行一覧 */}
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors duration-150" // ホバー時に行をハイライト
            >
              {/* getVisibleCells(): 現在表示対象のセルのみを返す（非表示列を除外） */}
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {/* status カラムだけ StatusBadge で描画し、他は flexRender で通常描画 */}
                  {cell.column.id === 'status' ? (
                    <StatusBadge status={row.original.status} />
                  ) : (
                    flexRender(
                      cell.column.columnDef.cell, // 列定義の cell フィールド（未指定なら値をそのまま表示）
                      cell.getContext(),          // 描画コンテキスト（値・行・テーブル情報を含む）
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
