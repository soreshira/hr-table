import { flexRender, type Table } from "@tanstack/react-table";
import type { User } from "../../types/person";

type Props = {
  table: Table<User>;
  isLoading: boolean;
  error: string | null;
};

export function PeopleTableView({ table, isLoading, error }: Props) {
  const nameFilter =
    (table.getColumn("name")?.getFilterValue() as string) ?? "";
  const usernameFilter =
    (table.getColumn("username")?.getFilterValue() as string) ?? "";

  return (
    <div className="space-y-4">
      {/* ── フィルター入力 ── */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="名前で絞り込み"
          value={nameFilter}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="block w-48 rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="ユーザー名で絞り込み"
          value={usernameFilter}
          onChange={(e) =>
            table.getColumn("username")?.setFilterValue(e.target.value)
          }
          className="block w-48 rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* ── テーブル本体 ── */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">読み込み中...</div>
      ) : !isLoading && error ? (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          エラー: {error}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── ページネーション ── */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {table.getPageCount()} ページ中{" "}
          {table.getState().pagination.pageIndex + 1} ページ目
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded px-3 py-1 border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
          >
            «
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded px-3 py-1 border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
          >
            ‹
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded px-3 py-1 border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
          >
            ›
          </button>
          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="rounded px-3 py-1 border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
