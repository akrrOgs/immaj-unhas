import Widget from "@/components/Admin/Widget";
import TableData from "@/components/Admin/articles/TableData";
import {
  getAllArticles,
  getAllGallery,
  getArticles,
  getUsers,
} from "@/lib/data";

const Dashboard = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { query = "", page = "1" } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const articles = await getArticles(query, currentPage);
  const allArticles = await getAllArticles();
  const users = await getUsers();
  const galleries = await getAllGallery();

  return (
    <div className="w-full grid gap-4">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
        <Widget
          value={allArticles?.length || 0}
          titleCard="Articles"
          bgColor="bg-blue-600"
          link="/admin/articles"
        />
        <Widget
          value={users?.length || 0}
          titleCard="Users"
          bgColor="bg-blue-600"
          link="/admin/users"
        />
        <Widget
          value={galleries?.length || 0}
          titleCard="All Image"
          bgColor="bg-blue-600"
          link="/admin/gallery"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-10">
        <TableData data={articles || []} />
      </div>
    </div>
  );
};

export default Dashboard;
