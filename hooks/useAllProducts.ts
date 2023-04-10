import { Product } from "@/types";
import { useFetch } from "./useFetch";

export const useAllProducts = () =>
	useFetch<Product[]>("/products");
