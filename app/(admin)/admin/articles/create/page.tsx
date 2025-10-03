import { auth } from "@/auth";
import CreateArticles from "@/components/Admin/articles/CreateArticles";
import { getCategories } from "@/lib/data";

const CreateArticle = async () => {
  const categories = await getCategories();
  const session = await auth();

  if (!categories) return null;

  return (
    <div className="max-w-screen-xl mx-auto">
      <CreateArticles
        categories={categories}
        userId={session?.user?.id || ""}
      />
    </div>
  );
};

export default CreateArticle;
