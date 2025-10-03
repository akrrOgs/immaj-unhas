import CreateCategory from "@/components/Admin/category/CreateCategory";
import TableData from "@/components/Admin/category/TableData";
import Pagination from "@/components/Pagination";
import SearchData from "@/components/Search";
import {
  getCategories,
  getCategoriesBySearch,
  getCategoryPages,
} from "@/lib/data";

const Category = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { query = "", page = "1" } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const categories = await getCategoriesBySearch(query, currentPage);
  const allCategories = await getCategories();

  const totalPages = await getCategoryPages(query);

  return (
    <div className="w-full bg-white rounded-[12px]">
      <h1 className="p-6 text-base font-medium text-gray-900 border-b border-slate-200">
        Total Categories : {allCategories?.length}
      </h1>
      <div className="flex justify-between items-center p-6">
        <SearchData
          data={allCategories || []}
          placeholder="Search by name"
          showSelected={false}
        />
        <CreateCategory />
      </div>
      <TableData data={categories || []} />
      <div className="flex justify-center items-center py-6 px-4 border-t border-slate-200">
        <Pagination totalPages={totalPages || 1} />
      </div>
    </div>
  );
};

export default Category;
