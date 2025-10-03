import TableData from "@/components/Admin/users/TableData";
import Pagination from "@/components/Pagination";
import SearchData from "@/components/Search";
import { getUsers, getUsersBySearch, getUsersPages } from "@/lib/data";
import { Plus } from "lucide-react";
import Link from "next/link";

const Users = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { query = "", page = "1" } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const users = await getUsersBySearch(query, currentPage);
  const allUsers = await getUsers();

  const totalPages = await getUsersPages(query);

  return (
    <div className="w-full bg-white rounded-[12px]">
      <h1 className="p-6 text-base font-medium text-gray-900 border-b border-slate-200">
        Total Users : {allUsers?.length}
      </h1>
      <div className="flex justify-between items-center p-6">
        <SearchData
          data={allUsers || []}
          placeholder="Search by name"
          showSelected={true}
          selectValue="Role"
        />
        <Link
          href="/admin/users/create"
          className="flex text-slate-50 rounded-md bg-blue-600 items-center py-2 px-3 gap-1.5"
        >
          <Plus className="size-5 text-white" />
          <p className="text-sm font-medium">Add Users</p>
        </Link>
      </div>
      <TableData data={users || []} />
      <div className="flex justify-center items-center py-6 px-4 border-t border-slate-200">
        <Pagination totalPages={totalPages || 1} />
      </div>
    </div>
  );
};

export default Users;
