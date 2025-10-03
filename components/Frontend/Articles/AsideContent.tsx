"use client";

import { formatDateWithTimezone } from "@/lib/utils";
import { ArticlesProps } from "@/types/articles";
import clsx from "clsx";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AsideContentProps {
  id: string;
  image: string;
  title: string;
  createdAt: Date;
  name: string;
}

const AsideContent = ({
  id,
  image,
  title,
  createdAt,
  name,
}: AsideContentProps) => {
  const pathname = usePathname();
  const activeId = pathname.split("/")[3];

  return (
    <div className="flex flex-col gap-3">
      <img src={image} alt={title} className="w-full h-48" />
      <div>
        <div className="flex w-full justify-between">
          <p className="text-sm text-gray-500 flex gap-1.5">
            <User className="size-4 text-gray-500" />
            {name}
          </p>
          <span className="text-sm text-gray-400">
            {formatDateWithTimezone(createdAt)}
          </span>
        </div>
        <Link
          href={`/frontend/articles/${id}`}
          className={clsx(
            `text-md font-semibold hover:text-blue-800 underline transition-colors duration-200 underline-offset-2`,
            activeId === id ? "text-blue-800" : "text-slate-950"
          )}
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

export default AsideContent;
