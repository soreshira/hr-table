import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  type Table,
  type PaginationState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { fetchUsers } from "../api/users";
import type { User } from "../types/person";

const PAGE_SIZE = 5;
const DEBOUNCE_MS = 300;

const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "名前" },
  { accessorKey: "username", header: "ユーザー名" },
  { accessorKey: "email", header: "メール" },
  { accessorKey: "phone", header: "電話" },
  { accessorKey: "website", header: "ウェブサイト" },
];

type UsePeopleTableReturn = {
  table: Table<User>;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
};

export function usePeopleTable(): UsePeopleTableReturn {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // API に渡すデバウンス済みフィルター値
  const [debouncedNameFilter, setDebouncedNameFilter] = useState("");
  const [debouncedUsernameFilter, setDebouncedUsernameFilter] = useState("");

  const [data, setData] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // フィルター入力をデバウンスし、変化時はページを先頭に戻す
  useEffect(() => {
    const name =
      (columnFilters.find((f) => f.id === "name")?.value as string) ?? "";
    const username =
      (columnFilters.find((f) => f.id === "username")?.value as string) ?? "";

    const timer = setTimeout(() => {
      // React 18 の自動バッチングにより 3 つの setState は 1 回の再レンダリングにまとめられる
      setDebouncedNameFilter(name);
      setDebouncedUsernameFilter(username);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [columnFilters]);

  // ページ変更 or デバウンス済みフィルター変更でAPIフェッチ
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchUsers(
          pagination.pageIndex + 1,
          debouncedNameFilter,
          debouncedUsernameFilter,
        );
        if (!cancelled) {
          setData(result.users);
          setTotalCount(result.totalCount);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "データの取得に失敗しました",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [pagination.pageIndex, debouncedNameFilter, debouncedUsernameFilter]);

  const table = useReactTable<User>({
    data,
    columns,
    manualPagination: true,
    manualFiltering: true, // フィルタリングはサーバー側で実施
    rowCount: totalCount,
    state: { pagination, columnFilters },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, isLoading, error, totalCount };
}
