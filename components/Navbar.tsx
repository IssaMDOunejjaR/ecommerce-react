import { useUser } from "@/contexts/user";
import Link from "next/link";
import Modal from "./Modal";
import { useRef, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Cart from "./Cart";
import UserOptions from "./UserOptions";

const NavbarLink = ({
	to,
	title,
}: {
	to: string;
	title: string;
}) => (
	<li className="text-gray-500 font-semibold transition-colors hover:text-black">
		<Link href={to} active-class="text-black">
			{title}
		</Link>
	</li>
);

const Navbar = () => {
	const {
		state: { user },
	} = useUser();

	const [showAuth, setShowAuth] = useState(false);
	const [showCart, setShowCart] = useState(false);
	const [authMode, setAuthMode] = useState<
		"signin" | "signup"
	>("signin");

	const authRef = useRef<HTMLElement>();

	const toggleShow = (value: "auth" | "cart") => {
		if (value === "auth") {
			setShowCart(false);
			setShowAuth((prev) => !prev);
		} else if (value === "cart") {
			setShowAuth(false);
			setShowCart((prev) => !prev);
		}
	};

	const toggleAuthMode = () => {
		setAuthMode((prev) =>
			prev === "signin" ? "signup" : "signin"
		);
	};

	return (
		<nav className="sticky top-0 bg-white px-3 border-b shadow-sm z-10">
			<div className="relative container flex items-center gap-8 py-3">
				<h1 className="text-2xl md:text-4xl font-extrabold uppercase text-orange-500">
					E-Shop
				</h1>

				<ul className="flex gap-4 text-xs md:text-base">
					<NavbarLink to="/" title="Home" />
					<NavbarLink
						to="/products"
						title="Products"
					/>
					<NavbarLink
						to="/categories"
						title="Categories"
					/>
				</ul>

				<div className="ml-auto flex items-center gap-4">
					<UserOptions toggleShow={toggleShow} />
				</div>

				{!user && showAuth && (
					<Modal
						toggleShow={toggleShow}
						mode="auth"
					>
						{authMode === "signin" ? (
							<SignIn
								toggleAuthMode={
									toggleAuthMode
								}
							/>
						) : (
							<SignUp
								toggleAuthMode={
									toggleAuthMode
								}
							/>
						)}
					</Modal>
				)}

				{showCart && (
					<Modal
						toggleShow={toggleShow}
						mode="cart"
					>
						<Cart />
					</Modal>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
