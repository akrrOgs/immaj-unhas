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
import { Input } from "@/components/ui/input";
import { Category } from "@/app/generated/prisma";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gallerySchema } from "@/lib/schema";
import Image from "next/image";
import { ArrowLeft, CloudUpload, Trash } from "lucide-react";
import { BarLoader } from "react-spinners";
import { type PutBlobResult } from "@vercel/blob";
import { useRef, useState, useTransition } from "react";
import { saveGallery } from "@/lib/actions";
import { usePathname, useRouter } from "next/navigation";

const CreateDocsAndStruc = ({ categories }: { categories: Category[] }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      division: "",
      categoryId: "",
      content: "",
    },
  });

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return null;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data.message);
        }
        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteImage = (image: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload?imageUrl=${image}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {
        console.log(error);
      }
    });
  };

  function onSubmit(values: Gallery) {
    try {
      saveGallery(image, values);
    } catch (error) {
      console.error(error);
    }
    if (pathname === "/admin/documentation/create") {
      router.push("/admin/documentation");
    } else {
      router.push("/admin/structure");
    }
  }
  return (
    <div className="flex flex-col w-full bg-white rounded-[12px] border border-slate-200 min-h-auto">
      <Link
        href={
          pathname === "/admin/documentation/create"
            ? "/admin/documentation"
            : "/admin/structure"
        }
        className="p-6 flex gap-2 items-center text-base font-medium text-slate-800 border-b border-slate-200"
      >
        <ArrowLeft className="size-5" />
        {pathname === "/admin/documentation/create"
          ? "Documentation"
          : "Structure"}
      </Link>
      <div className="flex flex-col gap-6 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload Field */}
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-gray-900">
                {pathname === "/admin/documentation/create"
                  ? "Images"
                  : "Picture"}
              </label>
              <label
                htmlFor="input-file"
                className="flex flex-col items-center justify-center w-[300px] h-[163px] aspect-video border-2 border-b-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative"
              >
                <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                  {pending ? <BarLoader /> : null}
                  {image ? (
                    <button
                      type="button"
                      onClick={() => deleteImage(image)}
                      className="flex items-center justify-center bg-transparent size-6 rounded-sm absolute top-1 right-1 text-white hover:bg-red-500"
                    >
                      <Trash className="size-4 text-transparent hover:text-white" />
                    </button>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <CloudUpload className="size-6" />
                      <p className="mb-1 text-sm font-bold">Select Image</p>
                      {message ? (
                        <p className="text-xs text-red-500">{message}</p>
                      ) : (
                        <p className="text-xs">
                          SVG, PNG, JPEG, GIF or Others (MAX: 4MB)
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {!image ? (
                  <input
                    type="file"
                    id="input-file"
                    className="hidden"
                    ref={inputFileRef}
                    onChange={handleUpload}
                  />
                ) : (
                  <Image
                    src={image}
                    alt="Thumbnail"
                    width={300}
                    height={163}
                    className="rounded-md absolute aspect-video object-cover"
                  />
                )}
              </label>
            </div>
            {/* TITLE FIELD */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {pathname === "/admin/documentation/create"
                      ? "Title"
                      : "Name"}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Division Field */}
            {pathname === "/admin/structure/create" && (
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
                      {pathname === "/admin/documentation/create"
                        ? categories
                            .filter(
                              (category) => category.name === "Documentation"
                            )
                            .map((category) => (
                              <SelectItem value={category.id} key={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                        : categories
                            .filter((category) => category.name === "Structure")
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
            <Button type="submit" className="bg-blue-600 text-white w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateDocsAndStruc;
