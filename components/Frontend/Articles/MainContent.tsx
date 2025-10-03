import { formatRelativeTimeWithMakassarTimezone } from "@/lib/utils";
import { ArticlesProps } from "@/types/articles";
import HTMLReactParser from "html-react-parser/lib/index";
import { User } from "lucide-react";

const MainContent = ({ articles }: { articles: ArticlesProps }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center px-5">
      <img
        src={articles.image}
        alt={articles.title}
        className="w-[100%] h-96 rounded-md"
      />
      <div className="grid w-full gap-1">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-slate-950">
            {articles.title}
          </h1>
          <p className="text-lg text-gray-500 w-56 text-right">
            {formatRelativeTimeWithMakassarTimezone(articles.createdAt)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-slate-950">
            {articles.category.name}
          </p>
          <div className="flex items-center gap-1.5">
            <User className="size-4 text-gray-500" />
            <p className="text-sm text-gray-500 italic">{articles.user.name}</p>
          </div>
        </div>
      </div>
      <article className="text-slate-950 w-full text-justify text-md font-normal">
        {HTMLReactParser(articles.content)}
      </article>
    </div>
  );
};

export default MainContent;
