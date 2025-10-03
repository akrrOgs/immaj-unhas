"use server";

import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import {
  articleSchema,
  categorySchema,
  createUserSchema,
  gallerySchema,
  signInSchema,
  updateUserSchema,
} from "./schema";
import { hashSync } from "bcrypt-ts";
import { AuthError } from "next-auth";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";

export const signInCredentials = async (formData: SiginInWithCredentials) => {
  const validatedFields = signInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/admin/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid Credentials",
          };
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

// USERS ACTIONS
export const createUserCredentials = async (formData: User) => {
  const validatedFields = createUserSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, username, role, password } = validatedFields.data;

  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        username,
        role,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return {
      message: "Failed to create user",
      error,
    };
  }
  redirect("/signin");
  // revalidatePath("/admin/users");
};

export const editUsers = async (formData: User, userId: string) => {
  const validatedFields = updateUserSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, username, role, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  let hashedPassword;
  if (password) {
    hashedPassword = hashSync(password, 10);
  } else {
    hashedPassword = existingUser?.password;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        username,
        role,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
};

export const deleteUsers = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/users");
};

// ARTICLES ACTIONS
export const saveArticle = async (image: string, formData: Articles) => {
  if (!image) return { message: "Image is required." };

  const rawData = {
    title: formData.title as string,
    content: formData.content as string,
    categoryId: formData.categoryId as string,
    userId: formData.userId as string,
  };

  const validatedFields = articleSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, categoryId, content, userId } = validatedFields.data;

  try {
    await prisma.articels.create({
      data: {
        title,
        categoryId,
        content,
        image,
        userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
};

export const updateArticle = async (
  image: string,
  articlesId: string,
  formData: Articles
) => {
  if (!image) return { message: "Image is required." };

  const rawData = {
    title: formData.title as string,
    content: formData.content as string,
    categoryId: formData.categoryId as string,
    userId: formData.userId as string,
  };

  const validatedFields = articleSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, categoryId, content, userId } = validatedFields.data;

  try {
    await prisma.articels.update({
      where: { id: articlesId },
      data: {
        title,
        categoryId,
        content,
        image,
        userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
};

export const deleteArticles = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.articels.delete({
      where: { id },
    });
    revalidatePath("/admin/articles");
  } catch (error) {
    console.log(error);
  }
};

// CATEGORY ACTIONS
export const saveCategory = async (formData: Category) => {
  const validatedFields = categorySchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    await prisma.category.create({
      data: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/admin/category");
  redirect("/admin/category");
};

export const editCategory = async (formData: Category, categoryId: string) => {
  const validatedFields = categorySchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/admin/category");
  redirect("/admin/category");
};

export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/category");
};

// GALLERY ACTIONS
export const saveGallery = async (image: string, formData: Gallery) => {
  const rawData = {
    title: formData.title as string,
    categoryId: formData.categoryId as string,
    content: formData.content as string,
    division: formData.division as string,
  };

  const validatedFields = gallerySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, division, categoryId, content } = validatedFields.data;

  try {
    await prisma.gallery.create({
      data: {
        title,
        categoryId,
        content,
        division,
        image,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateGallery = async (
  image: string,
  galleryId: string,
  formData: Gallery
) => {
  const rawData = {
    title: formData.title as string,
    division: formData.division as string,
    content: formData.content as string,
    categoryId: formData.categoryId as string,
  };

  const validatedFields = gallerySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, division, categoryId, content } = validatedFields.data;

  try {
    await prisma.gallery.update({
      where: { id: galleryId },
      data: {
        title,
        division,
        categoryId,
        content,
        image,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteGallery = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.gallery.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/documentation");
};
