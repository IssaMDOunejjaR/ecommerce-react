import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import Quantity from "@/components/Quantity";
import { useUser } from "@/contexts/user";
import { useProductById } from "@/hooks/useProductById";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Product = () => {
	const { handleAddToCart } = useUser();
	const { query } = useRouter();
	const { data: product } = useProductById(+query["id"]!);
	const {
		data: products,
		isLoading,
		error,
	} = useProductsByCategory(product?.category.id!);
	const [selectedPicture, setSelectedPicture] =
		useState("");
	const [quantity, setQuantity] = useState(1);

	const handleQuantityChange = (value: number) =>
		setQuantity(value);

	const AddToCart = () => {
		if (product) {
			handleAddToCart({ product, quantity });
		}
	};

	useEffect(() => {
		if (product) {
			setSelectedPicture(product.images[0]);
		}
	}, [product]);

	if (isLoading) return <Loader />;

	return (
		<>
			<Head>
				<title>{product?.title}</title>
			</Head>
			<main className="p-4">
				<div v-if="product" className="container">
					<div className="flex flex-col lg:flex-row">
						<div className="flex flex-col gap-4 flex-1">
							<img
								src={selectedPicture}
								alt={product?.title}
								className="rounded shadow"
							/>

							<div className="flex justify-center gap-4">
								{product?.images.map(
									(img, index) => (
										<div
											key={index}
											className={`cursor-pointer border border-transparent p-0.5 rounded shadow ${
												selectedPicture ===
													img &&
												"!border-black"
											}`}
											onClick={() => {
												setSelectedPicture(
													img
												);
											}}
										>
											<img
												src={img}
												alt={`${product?.title}_img_${index}`}
												width={120}
												height={120}
												className="rounded"
											/>
										</div>
									)
								)}
							</div>
						</div>

						<div className="p-8 flex-1">
							<h2 className="text-2xl font-bold">
								{product?.title}
							</h2>
							<small className="text-gray-500">
								{product?.category.name}
							</small>

							<h3 className="font-semibold mt-6">
								Description:
							</h3>
							<p className="max-w-[60%]">
								{product?.description}
							</p>

							<div className="mt-6">
								<Quantity
									quantity={quantity}
									handleQuantity={
										handleQuantityChange
									}
								/>
							</div>

							<div className="flex items-center mt-6 gap-4">
								<button
									className="bg-orange-500 flex items-center gap-4 p-4 rounded text-white uppercase font-semibold"
									onClick={AddToCart}
								>
									<Image
										src="https://www.svgrepo.com/show/506144/cart-4.svg"
										alt="cart"
										width={24}
										height={24}
										className="invert"
									/>
									Add to cart
								</button>

								<p className="text-3xl font-bold p-4 flex items-center">
									${product?.price}
								</p>
							</div>
						</div>
					</div>

					<div className="mt-16">
						<h2 className="text-2xl font-bold mb-4">
							Similar Products
						</h2>

						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{products
								?.slice(0, 4)
								.map((p) => (
									<ProductCard
										key={p.id}
										data={p}
									/>
								))}
						</div>
					</div>
				</div>

				<div className="container">
					<p className="text-4xl font-semibold p-8 text-center">
						{error}
					</p>
				</div>
			</main>
		</>
	);
};

export default Product;
