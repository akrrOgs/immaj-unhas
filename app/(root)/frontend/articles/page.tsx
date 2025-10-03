import Pagination from "@/components/Pagination";
import SearchData from "@/components/Search";
import { getArticlePages, getArticles, getCategories } from "@/lib/data";
import {
  formatRelativeTimeWithMakassarTimezone,
  formatDateWithTimezone,
} from "@/lib/utils";
import HTMLReactParser from "html-react-parser/lib/index";
import Image from "next/image";
import Link from "next/link";

const ArticlesPages = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { query = "", page = "1" } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const articles = await getArticles(query, currentPage);
  const categories = await getCategories();

  const totalPages = await getArticlePages(query);

  if (!articles) return null;

  return (
    <div className="min-h-screen p-8">
      <div className="flex w-full justify-between items-center">
        <SearchData
          data={categories || []}
          placeholder="Search by title"
          showSelected={true}
          selectValue="Category"
        />
        <p className="text-4xl uppercase font-semibold text-slate-950 shadow-xl shadow-slate-950 p-2 rounded-2xl">
          All Articles
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 place-content-center py-6">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/frontend/articles/${a.id}`}
            className="bg-white border-2 border-slate-300 hover:shadow-md hover:shadow-slate-950 flex transition-all duration-200 ease-in-out"
          >
            <img src={a.image} alt={a.title} className="w-[250px] h-[250px]" />
            <div className="p-2 flex flex-col gap-5">
              <div>
                <p className="text-sm font-semibold">{a.user.name}</p>
                <p className="text-[12px] font-semibold text-gray-500">
                  {formatDateWithTimezone(a.createdAt)} |{" "}
                  {formatRelativeTimeWithMakassarTimezone(a.createdAt)}
                </p>
                <span className="text-sm font-semibold text-gray-500">
                  {a.category.name}
                </span>
              </div>
              <p className="text-lg font-bold">{a.title}</p>
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

export default ArticlesPages;
