import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateWithTimezone } from "@/lib/utils";
import { UpdateCategory } from "./Button";
import { ButtonDelete } from "./ButtonDelete";
import { Category } from "@/app/generated/prisma";

const TableData = ({ data }: { data: Category[] }) => {
  if (!data) return null;

  return (
    <Table>
      <TableHeader className="bg-gray-100 py-10 px-4 text-center">
        <TableRow>
          <TableHead className="py-3 text-center">Name</TableHead>
          <TableHead className="py-3 text-center">Created At</TableHead>

          <TableHead className="py-3 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((category) => (
          <TableRow key={category.id} className="bg-white">
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {category.name}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {formatDateWithTimezone(category.createdAt)}
            </TableCell>

            <TableCell className="py-3 px-4 text-center text-sm font-normal flex items-center gap-2 justify-center">
              <UpdateCategory id={category.id} />
              <ButtonDelete id={category.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
