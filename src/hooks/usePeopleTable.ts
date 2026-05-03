import { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  type Table,
  type PaginationState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { fetchUsers } from "../api/users";
import type { User } from "../types/person";
import { formatDateTime } from "../utils/formatDateTime";

const PAGE_SIZE = 5;
const DEBOUNCE_MS = 300;

function createColumns(timezone: string): ColumnDef<User>[] {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "名前" },
    { accessorKey: "username", header: "ユーザー名" },
    { accessorKey: "email", header: "メール" },
    { accessorKey: "phone", header: "電話" },
    { accessorKey: "website", header: "ウェブサイト" },
    {
      id: "lastLogin",
      header: "最終ログイン",
      cell: ({ row }) => {
        const pseudoDate = DateTime.now().minus({
          days: row.original.id * 3,
          hours: (row.original.id * 7) % 24,
        });
        return formatDateTime(pseudoDate, timezone);
      },
    },
  ];
}

type UsePeopleTableReturn = {
  table: Table<User>;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
};

export function usePeopleTable(timezone: string): UsePeopleTableReturn {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [debouncedNameFilter, setDebouncedNameFilter] = useState("");
  const [debouncedUsernameFilter, setDebouncedUsernameFilter] = useState("");

  const [data, setData] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const columns = useMemo(() => createColumns(timezone), [timezone]);

  useEffect(() => {
    const name =
      (columnFilters.find((f) => f.id === "name")?.value as string) ?? "";
    const username =
      (columnFilters.find((f) => f.id === "username")?.value as string) ?? "";

    const timer = setTimeout(() => {
      setDebouncedNameFilter(name);
      setDebouncedUsernameFilter(username);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [columnFilters]);

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
    manualFiltering: true,
    rowCount: totalCount,
    state: { pagination, columnFilters },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, isLoading, error, totalCount };
}
