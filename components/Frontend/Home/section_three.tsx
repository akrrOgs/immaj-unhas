import { getAllDocs } from "@/lib/data";
import TitleHeader from "../TitleHeader";
import Image from "next/image";

const SectionThree = async () => {
  const documentation = await getAllDocs();

  return (
    <div className="flex flex-col items-center justify-center gap-8 my-8">
      <TitleHeader title="Gallery" sub="📸 What we Are Doing?" />
      <div className="xl:columns-3 md:columns-2 columns-1 space-y-4">
        {documentation?.map((doc) => (
          <div
            className="max-w-80 rounded-xl relative border-2 border-slate-950"
            key={doc.id}
          >
            <img
              className="object-cover rounded-xl object-center h-full w-full"
              src={doc.image || ""}
              alt={doc.title}
            />
            <p className="absolute bottom-0 left-0 right-0 p-2 rounded-b-xl bg-black/50 text-white w-full">
              {doc.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionThree;
