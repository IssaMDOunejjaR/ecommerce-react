import { useUser } from "@/contexts/user";
import CartPageCard from "./CartPageCard";
import Link from "next/link";
import CartCard from "./CartCard";

const Cart = () => {
	const {
		state: { user },
	} = useUser();

	return (
		<div className="flex flex-col gap-4 min-w-[300px]">
			<h2 className="text-3xl uppercase font-bold">
				Cart
			</h2>

			<div className="min-h-[200px]">
				{!user && (
					<p className="text-lg text-center py-8">
						You need to login.
					</p>
				)}
				{user &&
					user.cart &&
					user.cart.length === 0 && (
						<p className="mx-auto text-lg max-w-[150px] text-center py-8">
							You dont have any products in
							your cart.
						</p>
					)}
				<div>
					<div className="flex flex-col gap-2">
						{user?.cart
							.slice(0, 4)
							.map((item, index) => (
								<CartCard
									key={index}
									product={item.product}
								/>
							))}
					</div>
				</div>
			</div>

			{user && user.cart && user.cart.length > 4 && (
				<p className="text-sm text-gray-500 text-center italic">
					And {user.cart.length - 4} more products
				</p>
			)}

			<Link
				href="/cart"
				className="text-center p-3 rounded bg-orange-500 text-white uppercase font-semibold"
			>
				Go to cart page
			</Link>
		</div>
	);
};

export default Cart;
