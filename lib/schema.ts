import { object, string } from "zod";

export const signInSchema = object({
  username: string().nonempty("Username is required"),
  password: string().nonempty("Password is required"),
});

export const createUserSchema = object({
  name: string().nonempty("Name is required"),
  username: string().nonempty("Username is required"),
  role: string().nonempty("Role is required"),
  password: string()
    .min(8, "Password must be more than 8 characters")
    .nonempty("Password is required"),
  confPassword: string()
    .min(8, "Confirm Password must be more than 8 characters")
    .nonempty("Password is required"),
}).refine((data) => data.password === data.confPassword, {
  message: "Passwords do not match",
  path: ["confPassword"],
});

export const updateUserSchema = object({
  name: string().nonempty("Name is required"),
  username: string().nonempty("Username is required"),
  role: string().nonempty("Role is required"),
  password: string(),
  confPassword: string(),
}).refine((data) => data.password === data.confPassword, {
  message: "Passwords do not match",
  path: ["confPassword"],
});

export const articleSchema = object({
  title: string().nonempty("Title is required"),
  categoryId: string().nonempty("Category is required"),
  content: string().nonempty("Content is required"),
  userId: string(),
});

export const categorySchema = object({
  name: string().nonempty("Name is required"),
});

export const gallerySchema = object({
  title: string().nonempty("Title is required"),
  division: string().optional(),
  categoryId: string().nonempty("Category is required"),
  content: string().optional(),
});
