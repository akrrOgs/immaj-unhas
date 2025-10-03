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
import { ButtonDelete, ButtonEdit } from "../Button";
import { GalleryProps } from "@/types/docs";

const TableData = ({ data }: { data: GalleryProps[] }) => {
  const pathname = usePathname();
  if (!data) return null;

  return (
    <Table>
      <TableHeader>
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
        {data
          .filter((gallery) => gallery.category.name === "Documentation")
          .map((gallery) => (
            <TableRow key={gallery.id}>
              <TableCell className="py-3 text-center">
                {gallery.image ? (
                  <Image
                    src={gallery.image}
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
                {gallery.title}
              </TableCell>
              <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
                {gallery.category.name}
              </TableCell>
              <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
                {formatDateWithTimezone(gallery.createdAt)}
              </TableCell>
              {pathname === "/admin/dashboard" ? null : (
                <TableCell className="flex items-center justify-center gap-2 mt-2">
                  <ButtonEdit id={gallery.id} />
                  <ButtonDelete id={gallery.id} image={gallery.image || ""} />
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
