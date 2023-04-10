import Head from "next/head";

const NotFound = () => {
	return (
		<>
			<Head>
				<title>404 - Not Found</title>
			</Head>
			<div className="p-4 text-center text-5xl font-semibold">
				<h2 className="text-9xl">404</h2>
				<p>Not Found</p>
			</div>
		</>
	);
};

export default NotFound;
