import { Category } from "@/types";
import Link from "next/link";

const CategoryCard = ({ data }: { data: Category }) => {
	return (
		<Link
			href={`/categories/${data.id}`}
			className="relative p-16 bg-black bg-opacity-30 flex justify-center items-center transition-transform hover:scale-105 rounded overflow-hidden"
		>
			<img
				src={data.image}
				alt={data.name}
				className="absolute left-0 top-0 w-full h-full object-cover -z-10"
			/>

			<h2 className="text-white text-4xl text-center font-semibold">
				{data.name}
			</h2>
		</Link>
	);
};

export default CategoryCard;
