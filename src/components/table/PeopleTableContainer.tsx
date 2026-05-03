import { usePeopleTable } from "../../hooks/usePeopleTable";
import { useTimezone } from "../../context/TimezoneContext";
import { PeopleTableView } from "./PeopleTableView";

export function PeopleTableContainer() {
  const { timezone } = useTimezone();
  const { table, isLoading, error, totalCount } = usePeopleTable(timezone);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">従業員一覧</h1>
          <p className="mt-1 text-sm text-gray-500">
            社員情報の確認・管理ができます
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
          {totalCount}件
        </span>
      </div>

      {<PeopleTableView table={table} isLoading={isLoading} error={error} />}
    </div>
  );
}
