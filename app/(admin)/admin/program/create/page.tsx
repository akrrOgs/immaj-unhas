import { auth } from "@/auth";
import CreatePrograms from "@/components/Admin/program/CreatePrograms";
import { getCategories } from "@/lib/data";

const CreateWorkPrograms = async () => {
  const categories = await getCategories();
  const session = await auth();

  if (!categories) return null;

  return (
    <div className="max-w-screen-xl mx-auto">
      <CreatePrograms
        categories={categories}
        userId={session?.user?.id || ""}
      />
    </div>
  );
};

export default CreateWorkPrograms;
