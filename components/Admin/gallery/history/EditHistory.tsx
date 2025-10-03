"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gallerySchema } from "@/lib/schema";
import { ArrowLeft } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { saveGallery, updateGallery } from "@/lib/actions";
import { useRouter } from "next/navigation";
import JoditEditor from "jodit-react";
import { Input } from "@/components/ui/input";
import { GalleryProps } from "@/types/docs";
import { Category } from "@/app/generated/prisma";

const EditHistory = ({
  categories,
  history,
}: {
  categories: Category[];
  history: GalleryProps;
}) => {
  const editor = useRef(null);
  const [image, _] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: history.title,
      categoryId: history.categoryId,
      content: history.content || "",
    },
  });

  function onSubmit(values: Gallery) {
    try {
      updateGallery(image as string, history.id, values);
      router.push("/admin/history");
    } catch (error) {
      console.error(error);
    }
  }

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
    }),
    []
  );

  return (
    <div className="flex flex-col w-full bg-white rounded-[12px] border border-slate-200 min-h-auto">
      <Link
        href={"/admin/history"}
        className="p-6 flex gap-2 items-center text-base font-medium text-slate-800 border-b border-slate-200"
      >
        <ArrowLeft className="size-5" />
        History
      </Link>
      <div className="flex flex-col gap-6 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* TITLE FIELD */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category Field */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-900">
                    Category
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories
                        .filter(
                          (category) => !category.name.startsWith("Artikel")
                        )
                        .map((category) => (
                          <SelectItem value={category.id} key={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm font-normal text-slate-500">
                    The existing category list can be seen in the{" "}
                    <Link
                      href="/admin/category"
                      className="underline underline-offset-2 text-blue-600"
                    >
                      category
                    </Link>{" "}
                    menu
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Editor Fieald */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <JoditEditor
                    ref={editor}
                    config={config}
                    value={field.value}
                    onChange={field.onChange}
                    tabIndex={5}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-600 text-white w-full">
              Upload
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditHistory;
