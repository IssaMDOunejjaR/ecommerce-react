import ProtectedRoute from "@/components/ProtectedRoute";
import { useUser } from "@/contexts/user";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
	const {
		state: { user },
	} = useUser();

	return (
		<ProtectedRoute>
			<Head>
				<title>Profile</title>
			</Head>
			<main>
				<div className="container flex flex-col md:flex-row gap-4">
					<div className="md:w-[400px] flex flex-col items-center justify-center h-fit p-4">
						<div className="rounded-full p-4 border-2 border-black mb-4">
							<Image
								src="https://www.svgrepo.com/show/506352/user-1.svg"
								alt={user?.username || ""}
								width={100}
								height={100}
							/>
						</div>
						<h2 className="text-2xl font-semibold">
							{user?.username}
						</h2>
						<p className="text-gray-500">
							{user?.email}
						</p>
					</div>
					<div className="flex-1 p-4">
						<h3 className="text-2xl font-bold mb-6 text-center md:text-left">
							Orders
						</h3>

						<div className="flex flex-col gap-2">
							{user &&
								user.orders &&
								user.orders.map(
									(order, index) => (
										<Link
											href={`/order-confirmation/${order.orderId}`}
											key={index}
											className="flex justify-between p-4 border border-gray-400 rounded"
										>
											<h4 className="text-lg font-semibold">
												#
												{
													order.orderId
												}
											</h4>
											<p className="text-3xl font-bold">
												${" "}
												{
													order.totalPaid
												}
											</p>
										</Link>
									)
								)}

							{user &&
								user.orders &&
								user.orders.length ===
									0 && (
									<p
										v-if="state.user.orders.length === 0"
										className="text-lg font-semibold text-center"
									>
										You don&apos;t have
										any orders yet !
									</p>
								)}
						</div>
					</div>
				</div>
			</main>
		</ProtectedRoute>
	);
};

export default Profile;
