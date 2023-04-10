import { Product } from "@/types";

const OrderCard = ({
	product,
	quantity,
}: {
	product: Product;
	quantity: number;
}) => {
	return (
		<div className="py-1 flex items-center gap-2">
			<img
				src={product.images[0]}
				alt={product.title}
				className="w-10 h-10 rounded"
			/>
			<p className="flex items-center flex-1">
				{product.title}{" "}
				<span className="font-bold ml-2">
					{" "}
					x {quantity}
				</span>
				<span className="ml-auto font-semibold">
					$ {product.price * quantity}
				</span>
			</p>
		</div>
	);
};

export default OrderCard;
