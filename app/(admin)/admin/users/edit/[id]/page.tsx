import EditUsers from "@/components/Admin/users/EditUsers";
import { getAllUsersById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const UpdateUsers = async ({ params }: { params: Promise<{ id: string }> }) => {
  const usersId = (await params).id;
  const users = await getAllUsersById(usersId);

  if (!users) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <EditUsers users={users} />
      </Suspense>
    </div>
  );
};

export default UpdateUsers;
