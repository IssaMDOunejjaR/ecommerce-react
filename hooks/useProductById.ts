import { Product } from "@/types";
import { useFetch } from "./useFetch";

export const useProductById = (id: number) =>
	useFetch<Product>(`/products/${id}`);
