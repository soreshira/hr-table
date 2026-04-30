// PeopleTableContainer.tsx
// Container コンポーネント: テーブルのデータ・状態管理を担当する
// usePeopleTable フックでテーブルインスタンスを取得し、PeopleTableView（Presentation）に渡す
// 将来的なデータフェッチ・ローディング・エラー処理もここに集約する

import { usePeopleTable } from '../../hooks/usePeopleTable'
import { PeopleTableView } from './PeopleTableView'
import { mockPeople } from '../../data/mockPeople'

export function PeopleTableContainer() {
  // カスタムフックからテーブルインスタンスを取得（列定義・データ・行モデルをまとめて管理）
  const { table } = usePeopleTable()

  return (
    // ページ全体のレイアウト: コンテンツを左揃えで縦に並べる
    <div className="space-y-4">

      {/* ── ページヘッダー: タイトルとデータ件数 ── */}
      <div className="flex items-center justify-between">
        <div>
          {/* ページタイトル */}
          <h1 className="text-2xl font-bold text-gray-900">従業員一覧</h1>
          {/* サブタイトル */}
          <p className="mt-1 text-sm text-gray-500">
            社員情報の確認・管理ができます
          </p>
        </div>

        {/* データ件数バッジ */}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
          {mockPeople.length}件
        </span>
      </div>

      {/* ── テーブル本体: 描画は PeopleTableView（Presentation）に委譲 ── */}
      {/* table インスタンスを Props として渡すだけで、描画ロジックはここに持ち込まない */}
      <PeopleTableView table={table} />

    </div>
  )
}
