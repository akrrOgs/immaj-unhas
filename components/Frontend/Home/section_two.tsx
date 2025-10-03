import CardCompt from "@/components/Card";
import { getAllArticles } from "@/lib/data";
import TitleHeader from "../TitleHeader";

const SectionTwo = async () => {
  const articles = await getAllArticles();

  return (
    <div
      id="articles"
      className="flex flex-col items-center justify-center gap-8"
    >
      <TitleHeader title="Articles" sub="📚 Latest Articles" />
      <div className="flex flex-row items-center justify-center gap-5">
        {articles
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3)
          .map((a) => (
            <CardCompt key={a.id} {...a} />
          ))}
      </div>
    </div>
  );
};

export default SectionTwo;
