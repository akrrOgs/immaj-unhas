import { auth } from "@/auth";
import Navbar from "@/components/Admin/Navbar";
import Sidebar from "@/components/Admin/Sidebar";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar name={session?.user?.name || ""} />
        <main className="min-h-screen py-14 px-10 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
