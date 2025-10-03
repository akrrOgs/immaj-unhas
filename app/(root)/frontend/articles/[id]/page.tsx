import AsideContent from "@/components/Frontend/Articles/AsideContent";
import MainContent from "@/components/Frontend/Articles/MainContent";
import { getAllArticles, getAllArticlesById } from "@/lib/data";

const DetailArticels = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const articlesId = (await params).id;
  const article = await getAllArticlesById(articlesId);
  const articles = await getAllArticles();

  if (!article || !articles) return null;

  return (
    <div className="p-10 flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="flex-1">
        <MainContent articles={article} />
      </div>
      <aside className="w-96 flex flex-col gap-5 h-[50rem] overflow-y-auto overflow-hidden">
        {articles.map((a) => (
          <AsideContent
            key={a.id}
            id={a.id}
            image={a.image}
            title={a.title}
            createdAt={a.createdAt}
            name={a.user.name}
          />
        ))}
      </aside>
    </div>
  );
};

export default DetailArticels;
