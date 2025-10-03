import { auth } from "@/auth";
import EditPrograms from "@/components/Admin/program/EditPrograms";
import { getAllArticlesById, getCategories } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditWorkPrograms = async ({
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
        <EditPrograms
          categories={categories}
          userId={session?.user?.id || ""}
          articles={articles}
        />
      </Suspense>
    </div>
  );
};

export default EditWorkPrograms;
