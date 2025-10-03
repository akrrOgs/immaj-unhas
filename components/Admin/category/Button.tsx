import EditCategory from "./EditCategory";
import { getAllCategoryById } from "@/lib/data";
import { Suspense } from "react";

export const UpdateCategory = async ({ id }: { id: string }) => {
  const categories = await getAllCategoryById(id);

  if (!categories) return null;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCategory categories={categories} />
      </Suspense>
    </div>
  );
};
