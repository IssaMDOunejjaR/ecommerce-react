import CartPageCard from "@/components/CartPageCard";
import Container from "@/components/Container";
import { useUser } from "@/contexts/user";
import Head from "next/head";
import Link from "next/link";

const Cart = () => {
	const {
		state: { user },
	} = useUser();

	const total = user?.cart.reduce(
		(prev, current) =>
			prev + current.product.price * current.quantity,
		0
	);

	return (
		<>
			<Head>
				<title>Cart</title>
			</Head>
			<Container title="Cart">
				<div>
					{!user && (
						<p className="text-2xl font-semibold text-center py-8">
							You need to login.
						</p>
					)}
					{user &&
						user.cart &&
						user.cart.length === 0 && (
							<p className="mx-auto max-w-[250px] text-center py-8 text-2xl font-semibold">
								You dont have any products
								in your cart.
							</p>
						)}

					{user && (
						<div className="flex flex-col gap-4">
							{user?.cart.map(
								(item, index) => (
									<CartPageCard
										key={index}
										product={
											item.product
										}
										quantity={
											item.quantity
										}
									/>
								)
							)}

							<div className="flex gap-4 justify-end p-4">
								<p className="text-lg font-semibold flex items-center gap-6">
									Total Price:{" "}
									<span className="text-4xl font-bold">
										$ {total}
									</span>
								</p>

								{user &&
									user.cart &&
									user.cart.length >
										0 && (
										<Link
											href="/checkout"
											className="py-2 px-4 font-semibold bg-orange-500 rounded text-white"
										>
											Go to checkout
										</Link>
									)}
							</div>
						</div>
					)}
				</div>
			</Container>
		</>
	);
};

export default Cart;
