import { Category, Product } from "@/types";
import Link from "next/link";

interface TopCategoryCardProps {
	data: Product;
}

const TopCategoryCard = ({
	data,
}: TopCategoryCardProps) => {
	return (
		<div className="bg-gray-700 bg-opacity-50 w-full h-full relative flex gap-2 flex-col justify-center items-start p-4 text-white">
			<img
				src={data.category.image}
				alt={data.category.name}
				className="absolute left-0 w-full h-full object-cover -z-[1]"
			/>

			<h2 className="text-3xl font-bold">
				{data.category.name}
			</h2>

			<Link
				href={`/categories/${data.category.id}`}
				className="bg-blue-500 py-3 px-6 rounded-lg uppercase font-semibold shadow"
			>
				See related products
			</Link>
		</div>
	);
};

export default TopCategoryCard;
