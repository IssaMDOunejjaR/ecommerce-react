import OrderCard from "@/components/OrderCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUser } from "@/contexts/user";
import { Order } from "@/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderConfirmation = () => {
	const {
		state: { user },
	} = useUser();
	const { query } = useRouter();

	const [order, setOrder] = useState<Order | undefined>();

	useEffect(() => {
		setOrder(
			user?.orders.filter(
				(o: Order) => o.orderId === +query["id"]!
			)[0]
		);
	}, [query, user]);

	return (
		<ProtectedRoute>
			<Head>
				<title>Order - {order?.orderId}</title>
			</Head>
			<main className="p-4">
				<div className="container">
					<h1 className="text-3xl font-semibold mb-8 flex flex-col items-center gap-2">
						<Image
							src="https://www.svgrepo.com/show/509325/check-circle.svg"
							alt="check"
							width={70}
							height={70}
						/>
						Thank You For Your Order!
					</h1>

					<div className="max-w-[500px] mx-auto border border-gray-300 rounded">
						<div className="flex flex-col">
							<div className="flex justify-between bg-gray-300 font-bold p-3">
								<h2>
									Order Confirmation #
								</h2>
								<p>{order?.orderId}</p>
							</div>

							<div className="p-3">
								{order?.items.map(
									(item, index) => (
										<OrderCard
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
							</div>
						</div>

						<div className="border-t p-3 flex flex-col gap-6">
							<p className="text-lg font-semibold flex justify-between">
								Total{" "}
								<span className="text-3xl font-bold">
									$ {order?.totalPaid}
								</span>
							</p>

							<div className="flex justify-between">
								<div className="flex flex-col">
									<h3 className="font-semibold">
										Delivery Address
									</h3>

									<p className="text-sm">
										{order?.address}{" "}
										{order?.codePostal}
									</p>
									<p className="text-sm">
										{order?.country}
									</p>
								</div>

								<div className="flex flex-col">
									<h3 className="font-semibold">
										User Information
									</h3>

									<p className="text-sm">
										{order?.firstName}{" "}
										{order?.lastName}
									</p>
									<p className="text-sm">
										{order?.email}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</ProtectedRoute>
	);
};

export default OrderConfirmation;
