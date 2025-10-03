import SearchData from "@/components/Search";
import {
  getCategories,
  getDocsBySearch,
  getAllDocs,
  getGalleryPagesDocs,
} from "@/lib/data";
import { Plus } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import TableData from "@/components/Admin/gallery/documentation/TableData";

const Documentation = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { query = "", page = "1" } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const galeries = await getDocsBySearch(query, currentPage);
  const AllGallery = await getAllDocs();
  const categories = await getCategories();

  const totalPages = await getGalleryPagesDocs(query);

  if (!galeries) return null;

  return (
    <div className="w-full bg-white rounded-[12px]">
      <h1 className="p-6 text-base font-medium text-gray-900 border-b border-slate-200">
        Total Gallery Documentation : {AllGallery?.length}
      </h1>
      <div className="flex justify-between items-center p-6">
        <SearchData
          data={categories || []}
          placeholder="Search by title"
          selectValue="Category"
        />
        <Link
          href="/admin/documentation/create"
          className="flex text-slate-50 rounded-md bg-blue-600 items-center py-2 px-3 gap-1.5"
        >
          <Plus className="size-5 text-white" />
          <p className="text-sm font-medium">Add Documentation</p>
        </Link>
      </div>
      <TableData data={galeries || []} />
      <div className="flex justify-center items-center py-6 px-4 border-t border-slate-200">
        <Pagination totalPages={totalPages || 1} />
      </div>
    </div>
  );
};

export default Documentation;
