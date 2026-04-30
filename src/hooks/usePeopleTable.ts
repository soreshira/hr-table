// usePeopleTable.ts
// カスタムフック: TanStack Table のセットアップをカプセル化する
// Container コンポーネントがこのフックを呼び出し、得た table インスタンスを Presentation に渡す

import {
  useReactTable,      // TanStack Table のメインフック
  getCoreRowModel,    // 基本的な行モデル（ソート・フィルタなし）を生成するファクトリ
  type ColumnDef,     // 列定義の型
  type Table,         // テーブルインスタンスの型
} from '@tanstack/react-table'

import { mockPeople } from '../data/mockPeople'
import type { Person } from '../types/person'

// 各カラムの定義: accessorKey でデータのキーを指定し、header で表示名を設定
const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'id',         // Person.id を参照
    header: '社員ID',
  },
  {
    accessorKey: 'name',       // Person.name を参照
    header: '氏名',
  },
  {
    accessorKey: 'nameKana',   // Person.nameKana を参照
    header: 'ふりがな',
  },
  {
    accessorKey: 'department', // Person.department を参照
    header: '部署',
  },
  {
    accessorKey: 'position',   // Person.position を参照
    header: '役職',
  },
  {
    accessorKey: 'joinedAt',   // Person.joinedAt を参照
    header: '入社日',
  },
  {
    accessorKey: 'status',     // Person.status を参照（StatusBadge で描画）
    header: 'ステータス',
  },
]

// フックの戻り値の型: Presentation コンポーネントに渡す table インスタンスのみ
type UsePeopleTableReturn = {
  table: Table<Person>
}

// usePeopleTable: テーブルの列定義・データ・行モデルを useReactTable に渡してインスタンスを返す
export function usePeopleTable(): UsePeopleTableReturn {
  const table = useReactTable<Person>({
    data: mockPeople,          // 表示するデータ（現段階ではモックデータを直接使用）
    columns,                   // 上で定義したカラム定義
    getCoreRowModel: getCoreRowModel(), // 基本行モデル（ソート・ページネーションなしの素の並び順）
  })

  return { table }
}
