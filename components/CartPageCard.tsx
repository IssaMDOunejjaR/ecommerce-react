import { Product } from "@/types";
import Link from "next/link";
import Quantity from "./Quantity";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@/contexts/user";

const CartPageCard = ({
	product,
	quantity: q,
}: {
	product: Product;
	quantity: number;
}) => {
	const { handleRemoveFromCart, handleQuantity } =
		useUser();
	const [quantity, setQuantity] = useState(q);

	const handleQuantityChange = (value: number) => {
		handleQuantity(product.id, value);

		setQuantity(value);
	};

	const handleDeleteFromCart = () => {
		handleRemoveFromCart(product.id);
	};

	return (
		<div className="flex items-center gap-8">
			<img
				src={product.images[0]}
				alt={product.title}
				width={100}
				height={100}
				className="shadow rounded"
			/>

			<div className="flex flex-col">
				<Link
					href={`/products/${product.id}`}
					className="font-semibold text-2xl"
				>
					{product.title}
				</Link>
				<small className="text-gray-500">
					{product.category.name}
				</small>
				<p className="font-semibold text-lg">
					$ {product.price}
				</p>
			</div>

			<Quantity
				quantity={quantity}
				handleQuantity={handleQuantityChange}
			/>

			<div>
				<h4 className="flex gap-2">
					Total:
					<span className="text-xl font-semibold">
						$ {product.price * quantity}
					</span>
				</h4>
			</div>

			<button
				className="p-1 bg-red-500 rounded"
				onClick={handleDeleteFromCart}
			>
				<Image
					src="https://www.svgrepo.com/show/506767/trash.svg"
					alt="trash"
					width={32}
					height={32}
					className="invert"
				/>
			</button>
		</div>
	);
};

export default CartPageCard;
