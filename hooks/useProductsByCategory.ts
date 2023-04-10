import { Product } from "@/types";
import { useFetch } from "./useFetch";

export const useProductsByCategory = (
	categoryId: number
) => {
	return useFetch<Product[]>(
		`/categories/${categoryId}/products`
	);
};
