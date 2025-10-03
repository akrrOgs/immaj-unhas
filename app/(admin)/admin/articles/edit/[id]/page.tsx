import { auth } from "@/auth";
import EditArticles from "@/components/Admin/articles/EditArticles";
import { getAllArticlesById, getCategories } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const UpdateArticles = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const articlesId = (await params).id;
  const session = await auth();
  const [categories, articles] = await Promise.all([
    getCategories(),
    getAllArticlesById(articlesId),
  ]);

  if (!categories || !articles) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <EditArticles
          categories={categories}
          userId={session?.user?.id || ""}
          articles={articles}
        />
      </Suspense>
    </div>
  );
};

export default UpdateArticles;
