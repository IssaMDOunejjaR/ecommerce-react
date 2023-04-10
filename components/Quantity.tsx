import Image from "next/image";

interface QuantityProps {
	quantity: number;
	handleQuantity: (value: number) => void;
}

const Quantity = ({
	quantity,
	handleQuantity,
}: QuantityProps) => {
	const handleIncrement = () => {
		if (quantity < 100) handleQuantity(quantity + 1);
	};

	const handleDecrement = () => {
		if (quantity > 1) handleQuantity(quantity - 1);
	};

	return (
		<div className="ml-auto flex flex-col gap-2">
			<h4>Quantity:</h4>
			<div className="flex items-center gap-2">
				<button
					className="border bg-gray-100 rounded border-gray-300"
					onClick={handleDecrement}
				>
					<Image
						src="https://www.svgrepo.com/show/506259/minus-small.svg"
						alt="minus"
						width={40}
						height={40}
					/>
				</button>

				<input
					type="number"
					min="1"
					className="border p-2 rounded border-gray-300"
					value={quantity}
					onChange={(e: any) =>
						handleQuantity(+e.target.value)
					}
				/>

				<button
					className="border bg-gray-100 rounded border-gray-300"
					onClick={handleIncrement}
				>
					<Image
						src="https://www.svgrepo.com/show/506283/plus-small.svg"
						alt="plus"
						width={40}
						height={40}
					/>
				</button>
			</div>
		</div>
	);
};

export default Quantity;
