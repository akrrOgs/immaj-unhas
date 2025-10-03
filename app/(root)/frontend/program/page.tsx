import Pagination from "@/components/Pagination";
import SearchData from "@/components/Search";
import {
  getCategories,
  getProgramsBySearch,
  getProgramsPages,
} from "@/lib/data";
import {
  formatRelativeTimeWithMakassarTimezone,
  formatDateWithTimezone,
} from "@/lib/utils";
import HTMLReactParser from "html-react-parser/lib/index";
import Image from "next/image";
import Link from "next/link";

const ProgramPages = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { query = "", page = "1" } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const programs = await getProgramsBySearch(query, currentPage);
  const categories = await getCategories();

  const totalPages = await getProgramsPages(query);

  if (!programs) return null;

  return (
    <div className="min-h-screen p-8">
      <div className="flex w-full justify-between items-center">
        <SearchData
          data={categories || []}
          placeholder="Search by title"
          selectValue="Category"
        />
        <p className="text-4xl uppercase font-semibold text-slate-950 shadow-xl shadow-slate-950 p-2 rounded-2xl">
          All Programs
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 place-content-center py-6">
        {programs.map((p) => (
          <Link
            key={p.id}
            href={`/frontend/program/${p.id}`}
            className="bg-white border-2 border-slate-300 hover:shadow-md hover:shadow-slate-950 flex transition-all duration-200 ease-in-out"
          >
            <img src={p.image} alt={p.title} className="w-[250px] h-[250px]" />
            <div className="p-2 flex flex-col gap-5">
              <div>
                <p className="text-sm font-semibold">{p.user.name}</p>
                <p className="text-[12px] font-semibold text-gray-500">
                  {formatDateWithTimezone(p.createdAt)} |{" "}
                  {formatRelativeTimeWithMakassarTimezone(p.createdAt)}
                </p>
                <span className="text-sm font-semibold text-gray-500">
                  {p.category.name}
                </span>
              </div>
              <p className="text-lg font-bold">{p.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center px-4">
        <Pagination totalPages={totalPages || 1} />
      </div>
    </div>
  );
};

export default ProgramPages;
