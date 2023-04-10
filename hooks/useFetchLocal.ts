import axios from "axios";
import { useEffect, useState } from "react";

export const api = axios.create({
	baseURL: "http://localhost:3001",
});

export const useFetchLocal = (
	url: string,
	method:
		| "get"
		| "post"
		| "put"
		| "delete"
		| "patch" = "get",
	body?: any
) => {
	const [data, setData] = useState<any | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		setIsLoading(true);
		setError("");

		api[method](url, body)
			.then((response) => {
				setData(response.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);

				setError(err.response.statusText);
			});
	}, [url, method]);

	return {
		data,
		isLoading,
		error,
	};
};
