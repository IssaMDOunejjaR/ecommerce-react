import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ data }: { data: Product }) => {
	return (
		<Link
			href={`/products/${data.id}`}
			className="flex flex-col rounded shadow overflow-hidden transition-transform border hover:scale-105"
		>
			<img
				src={data.images[0]}
				alt={data.title}
				className="h-[300px] object-cover"
			/>

			<div className="p-3 flex flex-col gap-4 border-t flex-1">
				<div>
					<h3 className="font-semibold">
						{data.title}
					</h3>
					<small className="text-gray-500">
						{data.category.name}
					</small>
				</div>

				<div className="flex mt-auto items-center">
					<button
						className="bg-orange-500 p-1.5 rounded flex-1 flex justify-center items-center"
						//   @click.stop="handleAddToCart"
					>
						<Image
							src="https://www.svgrepo.com/show/506144/cart-4.svg"
							alt="cart"
							width={24}
							height={24}
							className="invert"
						/>
					</button>

					<p className="flex-1 font-bold text-2xl flex justify-center items-center">
						$ {data.price}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
