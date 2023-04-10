import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
	baseURL: "https://api.escuelajs.co/api/v1",
});

export const useFetch = <T>(
	url: string,
	method:
		| "get"
		| "post"
		| "put"
		| "delete"
		| "patch" = "get"
) => {
	const [data, setData] = useState<T | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		setIsLoading(true);
		setError("");

		api[method](url)
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
