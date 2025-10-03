"use client";

import { deleteCategory } from "@/lib/actions";
import { Trash } from "lucide-react";
import { useState } from "react";

export const ButtonDelete = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Set loading state to true
    try {
      await deleteCategory(id); // Call the delete function
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
