import Container from "@/components/Container";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import Head from "next/head";
import { useRouter } from "next/router";

const Category = () => {
	const { query } = useRouter();
	const { data: products, isLoading } =
		useProductsByCategory(+query["id"]!);

	if (isLoading) return <Loader />;

	return (
		<>
			<Head>
				<title>
					{products && products[0].category.name}
				</title>
			</Head>
			<Container
				title={
					products
						? products[0].category.name
						: ""
				}
			>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products?.map((product) => (
						<ProductCard
							key={product.id}
							data={product}
						/>
					))}
				</div>
			</Container>
		</>
	);
};

export default Category;
