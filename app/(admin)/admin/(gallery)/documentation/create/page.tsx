import CreateDocsAndStruc from "@/components/Admin/gallery/CreateDocsAndStruc";
import { getCategories } from "@/lib/data";

const CreateDocumentation = async () => {
  const categories = await getCategories();

  if (!categories) return null;

  return (
    <div className="max-w-screen-xl mx-auto">
      <CreateDocsAndStruc categories={categories} />
    </div>
  );
};

export default CreateDocumentation;
