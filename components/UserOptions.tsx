import { useUser } from "@/contexts/user";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const NavButton = ({
	children,
	imgUrl,
	imgAlt,
	onClick,
	id,
}: {
	children?: ReactNode;
	imgUrl: string;
	imgAlt: string;
	id: string;
	onClick: () => void;
}) => (
	<button
		className="relative p-1.5 border rounded-full border-black"
		onClick={onClick}
	>
		<Image
			src={imgUrl}
			alt={imgAlt}
			width={20}
			height={20}
			id={id}
		/>
		{children}
	</button>
);

const UserOptions = ({
	toggleShow,
}: {
	toggleShow: (value: "auth" | "cart") => void;
}) => {
	const {
		state: { user },
		handleSetUser,
	} = useUser();

	const handleLogout = () => {
		localStorage.removeItem("user");

		handleSetUser(null);
	};

	return (
		<>
			<NavButton
				imgUrl="https://www.svgrepo.com/show/506144/cart-4.svg"
				imgAlt="cart"
				id="cart"
				onClick={() => toggleShow("cart")}
			>
				{user?.cart && user.cart.length > 0 && (
					<div className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4">
						{user.cart.length}
					</div>
				)}
			</NavButton>
			{user && (
				<NavButton
					imgAlt="logout"
					imgUrl="https://www.svgrepo.com/show/507772/logout.svg"
					id="logout"
					onClick={handleLogout}
				/>
			)}
			{!user && (
				<NavButton
					imgUrl="https://www.svgrepo.com/show/506352/user-1.svg"
					imgAlt="user"
					id="auth"
					onClick={() => toggleShow("auth")}
				/>
			)}
			{user && (
				<Link
					href="/profile"
					className="p-1.5 border rounded-full border-black"
				>
					<Image
						src="https://www.svgrepo.com/show/506352/user-1.svg"
						alt="user"
						width={20}
						height={20}
					/>
				</Link>
			)}
			{user && user.username && (
				<h3 className="font-semibold text-lg">
					{user.username}
				</h3>
			)}
		</>
	);
};

export default UserOptions;
