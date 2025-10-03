import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/generated/prisma";
import { formatDateWithTimezone } from "@/lib/utils";
import { ButtonDelete, ButtonEdit } from "./Button";

const TableData = ({ data }: { data: User[] }) => {
  if (!data) return null;

  return (
    <Table>
      <TableHeader className="bg-gray-100 py-10 px-4 text-center">
        <TableRow>
          <TableHead className="py-3 text-center">Name</TableHead>
          <TableHead className="py-3 text-center">Username</TableHead>
          <TableHead className="py-3 text-center">Role</TableHead>
          <TableHead className="py-3 text-center">Created At</TableHead>
          <TableHead className="py-3 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id} className="bg-white">
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {user.name}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {user.username}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {user.role}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {formatDateWithTimezone(user.createdAt)}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal flex items-center gap-2 justify-center">
              <ButtonEdit id={user.id} />
              <ButtonDelete id={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
