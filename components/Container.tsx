import { ReactNode } from "react";

const Container = ({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) => {
	return (
		<main className="px-4">
			<div className="container">
				<h1 className="text-4xl font-bold mb-4">
					{title}
				</h1>

				{children}
			</div>
		</main>
	);
};

export default Container;
