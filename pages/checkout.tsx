import Button from "@/components/Button";
import Container from "@/components/Container";
import OrderCard from "@/components/OrderCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import TextBox from "@/components/TextBox";
import { countries } from "@/constants";
import { useUser } from "@/contexts/user";
import { Order } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";

const Checkout = () => {
	const {
		state: { user },
		handleAddOrder,
	} = useUser();

	const { push } = useRouter();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [address, setAddress] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [securityCode, setSecurityCode] = useState("");
	const [expirationDate, setExpirationDate] =
		useState("");
	const total = user?.cart.reduce(
		(prev, current) =>
			prev + current.product.price * current.quantity,
		0
	);

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (user) {
			const orderId = Date.now();

			const order: Order = {
				firstName,
				lastName,
				email,
				codePostal: postalCode,
				address,
				cardNumber,
				cardSecurityCode: securityCode,
				cardExpirationDate: expirationDate,
				country: country,
				items: user?.cart,
				orderId,
				totalPaid: total!,
			};

			handleAddOrder(order);

			push(`/order-confirmation/${orderId}`);
		}
	};

	return (
		<ProtectedRoute>
			<Container title="Checkout">
				<div className="flex flex-col md:flex-row gap-4">
					<form
						className="flex flex-col gap-4 flex-1"
						onSubmit={handleSubmit}
					>
						<div className="flex flex-col gap-2">
							<h2 className="text-lg font-semibold">
								Personnal Information
							</h2>

							<div className="flex gap-2">
								<TextBox
									placeholder="First Name"
									value={firstName}
									onChange={(e: any) =>
										setFirstName(
											e.target.value
										)
									}
								/>
								<TextBox
									placeholder="Last Name"
									value={lastName}
									onChange={(e: any) =>
										setLastName(
											e.target.value
										)
									}
								/>
							</div>
							<TextBox
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e: any) =>
									setEmail(e.target.value)
								}
							/>
							<div className="flex gap-2">
								<label className="w-full text-sm flex flex-col gap-1">
									Country
									<select
										className="w-full p-2 border border-gray-300 rounded"
										value={country}
										onChange={(
											e: any
										) =>
											setCountry(
												e.target
													.value
											)
										}
										required
									>
										<option
											value=""
											disabled
										>
											Select Country
										</option>
										{countries.map(
											(
												country,
												index
											) => (
												<option
													v-for="(country, index) in countries"
													key={
														index
													}
													value={
														country
													}
												>
													{
														country
													}
												</option>
											)
										)}
									</select>
								</label>
								<TextBox
									placeholder="Postal Code"
									value={postalCode}
									onChange={(e: any) =>
										setPostalCode(
											e.target.value
										)
									}
								/>
							</div>
							<TextBox
								placeholder="Address"
								value={address}
								onChange={(e: any) =>
									setAddress(
										e.target.value
									)
								}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<h2 className="text-lg font-semibold">
								Payment Details
							</h2>

							<TextBox
								placeholder="Card Number"
								value={cardNumber}
								onChange={(e: any) =>
									setCardNumber(
										e.target.value
									)
								}
							/>
							<div className="flex gap-2">
								<TextBox
									placeholder="Security Code"
									value={securityCode}
									onChange={(e: any) =>
										setSecurityCode(
											e.target.value
										)
									}
								/>
								<TextBox
									type="date"
									placeholder="Expiration Date"
									value={expirationDate}
									onChange={(e: any) =>
										setExpirationDate(
											e.target.value
										)
									}
								/>
							</div>
						</div>

						<Button>Confirm</Button>
					</form>

					<div className="w-[400px] border rounded border-gray-300 shadow-sm flex flex-col">
						<div className="p-4 flex flex-col">
							<h2 className="text-2xl font-semibold">
								Your Order
							</h2>

							{user &&
								user.cart &&
								user.cart.map(
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

						<div className="p-4 border-t mt-auto flex justify-between">
							<h2 className="text-lg font-semibold">
								Total:
							</h2>
							<p className="text-5xl font-bold">
								$ {total}
							</p>
						</div>
					</div>
				</div>
			</Container>
		</ProtectedRoute>
	);
};

export default Checkout;
