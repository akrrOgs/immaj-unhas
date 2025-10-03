import AsideContent from "@/components/Frontend/Articles/AsideContent";
import MainContent from "@/components/Frontend/Articles/MainContent";
import { getAllArticlesById, getAllPrograms } from "@/lib/data";

const DetailArticels = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const programsId = (await params).id;
  const program = await getAllArticlesById(programsId);
  const programs = await getAllPrograms();

  if (!program || !programs) return null;

  return (
    <div className="p-10 flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="flex-1">
        <MainContent articles={program} />
      </div>
      <aside className="w-96 flex flex-col gap-5 h-[50rem] overflow-y-auto overflow-hidden">
        {programs.map((p) => (
          <AsideContent
            key={p.id}
            id={p.id}
            image={p.image}
            title={p.title}
            createdAt={p.createdAt}
            name={p.user.name}
          />
        ))}
      </aside>
    </div>
  );
};

export default DetailArticels;
