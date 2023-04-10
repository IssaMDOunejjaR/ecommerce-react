import { Product } from "@/types";
import Link from "next/link";
import React from "react";

interface TopCardProps {
	data: Product;
}

const TopCard = ({ data }: TopCardProps) => {
	if (!data) return null;

	return (
		<div className="bg-gray-700 bg-opacity-50 w-full h-full relative flex gap-2 flex-col justify-center items-start p-4 text-white">
			<img
				src={data.images[0]}
				alt={data.title}
				className="absolute left-0 w-full h-full object-cover -z-[1]"
			/>

			<h2 className="text-3xl font-bold">
				{data.title}
			</h2>
			<p className="max-w-[50%] italic text-sm mb-4 overflow-hidden h-[40px]">
				{data.description}
			</p>

			<Link
				href={`/products/${data.id}`}
				className="bg-blue-500 py-3 px-6 rounded-lg uppercase font-semibold shadow"
			>
				Shop Now
			</Link>
		</div>
	);
};

export default TopCard;
