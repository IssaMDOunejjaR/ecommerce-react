import CategoryCard from "@/components/CategoryCard";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import { useAllCategories } from "@/hooks/useAllCategories";
import Head from "next/head";

const Categories = () => {
	const { data: categories, isLoading } =
		useAllCategories();

	if (isLoading) return <Loader />;

	return (
		<>
			<Head>
				<title>Categories</title>
			</Head>
			<Container title="Categories">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{categories?.map((category) => (
						<CategoryCard
							key={category.id}
							data={category}
						/>
					))}
				</div>
			</Container>
		</>
	);
};

export default Categories;
