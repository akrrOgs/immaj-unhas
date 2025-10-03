import CreateHistory from "@/components/Admin/gallery/history/CreateHistory";
import { getCategories } from "@/lib/data";

const CreateHistories = async () => {
  const categories = await getCategories();

  if (!categories) return null;

  return (
    <div className="max-w-screen-xl mx-auto">
      <CreateHistory categories={categories} />
    </div>
  );
};

export default CreateHistories;
