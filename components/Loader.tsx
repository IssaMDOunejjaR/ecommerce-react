import Image from "next/image";

const Loader = () => {
	return (
		<div className="fixed top-0 bg-white w-full h-full z-50 flex justify-center items-center">
			<div className="relative w-24 h-24 flex justify-center items-center">
				<span className="absolute w-full h-full rounded-full border-4 border-orange-500 border-x-transparent animate-spin"></span>

				<Image
					src="https://www.svgrepo.com/show/506144/cart-4.svg"
					alt="cart"
					width={40}
					height={40}
				/>
			</div>
		</div>
	);
};

export default Loader;
