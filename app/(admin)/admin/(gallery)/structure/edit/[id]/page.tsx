import EditDocsAndStruc from "@/components/Admin/gallery/EditDocsAndStruc";
import { getAllGalleryById, getCategories } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const UpdateDocumentation = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const docsId = (await params).id;
  const [categories, documentation] = await Promise.all([
    getCategories(),
    getAllGalleryById(docsId),
  ]);

  if (!categories || !documentation) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <EditDocsAndStruc
          categories={categories}
          documentation={documentation}
        />
      </Suspense>
    </div>
  );
};

export default UpdateDocumentation;
