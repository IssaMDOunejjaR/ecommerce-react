import Container from "@/components/Container";
import Features from "@/components/Features";
import Loader from "@/components/Loader";
import TopCategories from "@/components/TopCategories";
import TopProducts from "@/components/TopProducts";
import { useAllProducts } from "@/hooks/useAllProducts";
import Head from "next/head";

export default function Home() {
	const { data: products, isLoading } = useAllProducts();

	if (isLoading) return <Loader />;

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<Container title="Top Products">
				<TopProducts data={products} />
			</Container>

			<Features />

			<Container title="Top Products">
				<TopCategories data={products} />
			</Container>

			<Container title="Top Sales">
				<TopProducts data={products} />
			</Container>
		</>
	);
}
