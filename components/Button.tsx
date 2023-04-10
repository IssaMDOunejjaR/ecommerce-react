import { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => {
	return (
		<button
			type="submit"
			className="w-full p-2 bg-orange-500 rounded text-white font-semibold"
		>
			{children}
		</button>
	);
};

export default Button;
