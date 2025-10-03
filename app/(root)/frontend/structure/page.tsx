import TitleHeader from "@/components/Frontend/TitleHeader";
import { getAllStruc } from "@/lib/data";
import Image from "next/image";

const Structure = async () => {
  const structures = await getAllStruc();

  return (
    <div className="flex flex-col items-center justify-center w-full p-10 space-y-4">
      <TitleHeader
        title="Structure Organization"
        sub="👨‍💻 Organizational Administrators Of IMMAJ"
      />
      <div className="flex flex-wrap items-center justify-center gap-5 ">
        {structures?.map((s) => (
          <div
            key={s.id}
            className="w-80 bg-white rounded-xl border border-slate-200"
          >
            <img
              src={s.image || ""}
              alt={s.title}
              className="w-full h-60 object-cover object-center"
            />
            <div className="p-2 flex flex-col items-center justify-center gap-2">
              <p className="text-xl font-semibold text-slate-950">{s.title}</p>
              <p className="text-md font-semibold text-gray-500">
                {s.division}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Structure;
