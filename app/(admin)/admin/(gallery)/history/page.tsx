import { ButtonEdit } from "@/components/Admin/gallery/Button";
import CardHistory from "@/components/Admin/gallery/history/CardHistory";
import { getAllHistory } from "@/lib/data";
import { Plus } from "lucide-react";
import Link from "next/link";

const History = async () => {
  const history = await getAllHistory();

  return (
    <div className="w-full bg-white rounded-[12px]">
      {history?.map((h) => (
        <div key={h.id}>
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <h1 className="text-base font-medium text-gray-900 ">
              HISTORY OF IMMAJ
            </h1>
            {history.length > 0 ? (
              <ButtonEdit id={h.id} />
            ) : (
              <Link
                href="/admin/history/create"
                className="flex text-slate-50 rounded-md bg-blue-600 items-center py-2 px-3 gap-1.5"
              >
                <Plus className="size-5 text-white" />
                <p className="text-sm font-medium">Add History</p>
              </Link>
            )}
          </div>

          <div className="p-6 flex justify-center items-center">
            <CardHistory key={h.id} title={h.title} content={h.content || ""} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
