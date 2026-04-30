import axios from "axios";
import type { User } from "../types/person";

const PAGE_SIZE = 5;

export type FetchUsersResult = {
  users: User[];
  totalCount: number;
};

export async function fetchUsers(
  page: number,
  nameFilter = "",
  usernameFilter = "",
): Promise<FetchUsersResult> {
  const res = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    {
      params: {
        _page: page,
        _limit: PAGE_SIZE,
        ...(nameFilter ? { name_like: nameFilter } : {}),
        ...(usernameFilter ? { username_like: usernameFilter } : {}),
      },
    },
  );
  const totalCount = Number(res.headers["x-total-count"]) || res.data.length;
  return { users: res.data, totalCount };
}
