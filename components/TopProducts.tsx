import React from "react";
import TopCard from "./TopCard";
import { Product } from "@/types";

interface TopProductsProps {
	data: Product[] | undefined;
}

const TopProducts = ({ data }: TopProductsProps) => {
	const randomProducts = (() => {
		const arr: Product[] = [];

		if (data) {
			for (let i = 0; i < 3; i++) {
				const index = Math.floor(
					Math.random() * data.length
				);

				arr.push(data[index]);
			}
		}

		return arr;
	})();

	return (
		<div
			v-if="data.length"
			className="grid md:grid-cols-2 lg:grid-cols-5 grid-rows-[repeat(2,250px)] gap-3"
		>
			<div className="md:col-span-2 lg:col-span-3 lg:row-span-2">
				<TopCard data={randomProducts[0]} />
			</div>
			<div className="lg:col-span-2">
				<TopCard data={randomProducts[1]} />
			</div>
			<div className="lg:col-span-2">
				<TopCard data={randomProducts[2]} />
			</div>
		</div>
	);
};

export default TopProducts;
