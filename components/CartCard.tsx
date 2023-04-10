import { useUser } from "@/contexts/user";
import { Product } from "@/types";
import Image from "next/image";

interface CartCardProps {
	product: Product;
}

const CartCard = ({ product }: CartCardProps) => {
	const { handleRemoveFromCart } = useUser();

	const handleDeleteFromCart = () => {
		handleRemoveFromCart(product.id);
	};

	return (
		<div className="flex items-center gap-2">
			<img
				src={product.images[0]}
				alt={product.title}
				width={48}
				height={48}
				className="shadow"
			/>
			<h3 className="font-semibold">
				{product.title}
			</h3>

			<button
				className="ml-auto p-1 bg-red-500 rounded"
				onClick={handleDeleteFromCart}
			>
				<Image
					src="https://www.svgrepo.com/show/506767/trash.svg"
					alt="trash"
					width={24}
					height={24}
					className="invert"
				/>
			</button>
		</div>
	);
};

export default CartCard;
