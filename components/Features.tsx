import Image from "next/image";

interface FeatureCardProps {
	img: string;
	title: string;
	description: string;
}

const FeatureCard = ({
	img,
	title,
	description,
}: FeatureCardProps) => {
	return (
		<div className="flex gap-4 items-center justify-center">
			<div className="p-4 border border-white rounded-full">
				<Image
					src={img}
					alt={title}
					width={40}
					height={40}
					className="invert"
				/>
			</div>

			<div>
				<h2 className="text-lg font-semibold">
					{title}
				</h2>
				<p className="text-xs">{description}</p>
			</div>
		</div>
	);
};

const Features = () => {
	return (
		<div className="p-4 bg-black text-white">
			<div className="container grid gap-4 items-center justify-center md:grid-cols-2 lg:grid-cols-4">
				<FeatureCard
					title="Free Delivery"
					description="Free shipping on all order"
					img="https://www.svgrepo.com/show/513006/truck-round-653.svg"
				/>
				<FeatureCard
					title="Online support 24/7"
					description="Support online 24 hours a day"
					img="https://www.svgrepo.com/show/486865/support.svg"
				/>
				<FeatureCard
					title="Money Return"
					description="Back guarantee under 7 days"
					img="https://www.svgrepo.com/show/509169/money.svg"
				/>
				<FeatureCard
					title="Member Discount"
					description="On every order over $120.00"
					img="https://www.svgrepo.com/show/506817/discount.svg"
				/>
			</div>
		</div>
	);
};

export default Features;
