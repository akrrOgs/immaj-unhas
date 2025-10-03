import EditHistory from "@/components/Admin/gallery/history/EditHistory";
import { getAllGalleryById, getCategories } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const UpdateHistories = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const storyId = (await params).id;
  const [categories, history] = await Promise.all([
    getCategories(),
    getAllGalleryById(storyId),
  ]);

  if (!categories || !history) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <EditHistory categories={categories} history={history} />
      </Suspense>
    </div>
  );
};

export default UpdateHistories;
