"use client";

import { deleteUsers } from "@/lib/actions";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const ButtonEdit = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/admin/users/edit/${id}`}
      className="rounded-sm p-1 cursor-pointer"
    >
      <Pencil className="size-5 hover:text-yellow-500 hover:scale-125 transition-all duration-200" />
    </Link>
  );
};

export const ButtonDelete = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Set loading state to true
    try {
      await deleteUsers(id); // Call the delete function
    } catch (error) {
      console.error("Failed to delete category:", error);
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
