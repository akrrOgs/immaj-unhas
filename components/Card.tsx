import Link from "next/link";
import HTMLReactParser from "html-react-parser";
import { ArticlesProps } from "@/types/articles";
import { formatRelativeTimeWithMakassarTimezone } from "@/lib/utils";

const CardCompt = ({
  id,
  title,
  content,
  image,
  user,
  createdAt,
  category,
}: ArticlesProps) => {
  return (
    <Link
      href={`/frontend/articles/${id}`}
      className="w-96 bg-white grid gap-5 rounded-md border border-slate-100 hover:shadow-md hover:shadow-black transition-all duration-300 hover:scale-105 relative"
    >
      <img
        src={image}
        alt={title}
        className="rounded-br-[70%] rounded-t-md object-cover w-full h-60"
      />
      <div className="p-2 gird gap-1">
        <div className="flex justify-between">
          <h1 className="text-sm text-gray-500 font-semibold">
            By {user.name}
          </h1>
          <h1 className="text-sm text-gray-500 font-semibold">
            {category.name}
          </h1>
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <span className="text-sm text-gray-500">
          {formatRelativeTimeWithMakassarTimezone(createdAt)}
        </span>
        <article className="flex">
          {HTMLReactParser(content.slice(0, 20))}
        </article>
      </div>
    </Link>
  );
};

export default CardCompt;
