import Container from "@/components/Container";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useAllProducts } from "@/hooks/useAllProducts";
import Head from "next/head";

const Products = () => {
	const { data: products, isLoading } = useAllProducts();

	if (isLoading) return <Loader />;

	return (
		<>
			<Head>
				<title>Products</title>
			</Head>
			<Container title="Products">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products?.map((product) => (
						<ProductCard
							key={product.id}
							data={product}
						/>
					))}
				</div>

				{products?.length === 0 && (
					<p className="p-4 text-center text-xl font-semibold">
						We didn&apos;t any products
					</p>
				)}
			</Container>
		</>
	);
};

export default Products;
