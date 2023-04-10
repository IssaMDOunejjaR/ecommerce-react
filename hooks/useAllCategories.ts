import { Category } from "@/types";
import { useFetch } from "./useFetch";

export const useAllCategories = () =>
	useFetch<Category[]>("/categories");
