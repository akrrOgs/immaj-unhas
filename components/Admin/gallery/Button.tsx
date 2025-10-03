"use client";

import { deleteGallery } from "@/lib/actions";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const ButtonEdit = ({ id }: { id: string }) => {
  const pathname = usePathname();

  return (
    <Link
      href={
        pathname === "/admin/documentation"
          ? `/admin/documentation/edit/${id}`
          : pathname === "/admin/structure"
          ? `/admin/structure/edit/${id}`
          : `/admin/history/edit/${id}`
      }
      className="rounded-sm p-1 cursor-pointer"
    >
      {pathname === "/admin/history" ? (
        <div className="flex text-slate-50 rounded-md bg-yellow-500 items-center py-2 px-3 gap-2">
          <Pencil className="size-5 text-black" />
          <p className="text-sm font-medium text-black">Edit History</p>
        </div>
      ) : (
        <Pencil className="size-5 hover:text-yellow-500 hover:scale-125 transition-all duration-200" />
      )}
    </Link>
  );
};

export const ButtonDelete = ({ id, image }: { id: string; image: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Set loading state to true
    try {
      await deleteGallery(id, image); // Call the delete function
    } catch (error) {
      console.error("Failed to delete documentation:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="rounded-sm p-1 cursor-pointer">
        {isLoading ? (
          <span>Deleting...</span>
        ) : (
          <Trash className="size-5 hover:text-destructive hover:scale-125 transition-all duration-200" />
        )}
      </button>
    </form>
  );
};
