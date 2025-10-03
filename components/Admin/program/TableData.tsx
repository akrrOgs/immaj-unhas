"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateWithTimezone } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ButtonDelete, ButtonEdit } from "./Button";
import { ArticlesProps } from "@/types/articles";

const TableData = ({ data }: { data: ArticlesProps[] }) => {
  const pathname = usePathname();
  if (!data) return null;

  return (
    <Table>
      <TableHeader className="bg-gray-100 py-10 px-4 text-center">
        <TableRow>
          <TableHead className="py-3 text-center">Thumbnail</TableHead>
          <TableHead className="py-3 text-center">Title</TableHead>
          <TableHead className="py-3 text-center">Category</TableHead>
          <TableHead className="py-3 text-center">Created At</TableHead>
          {pathname === "/admin/dashboard" ? null : (
            <TableHead className="py-3 text-center">Action</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((article) => (
          <TableRow key={article.id} className="bg-white">
            <TableCell className="py-3 text-center">
              {article.image ? (
                <Image
                  src={article.image}
                  alt="Thumbnail"
                  width={60}
                  height={60}
                  className="rounded-[6px] mx-auto"
                />
              ) : (
                <Image
                  src="/icons/Image.png"
                  alt="Thumb Broken"
                  width={60}
                  height={60}
                  className="rounded-[6px] mx-auto"
                />
              )}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {article.title}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {article.category.name}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {formatDateWithTimezone(article.createdAt)}
            </TableCell>
            {pathname === "/admin/dashboard" ? null : (
              <TableCell className="flex items-center gap-2 justify-center">
                <ButtonEdit id={article.id} />
                <ButtonDelete id={article.id} image={article.image} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
