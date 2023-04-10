import { useState } from "react";
import Button from "./Button";
import TextBox from "./TextBox";
import { api } from "@/hooks/useFetchLocal";
import { useUser } from "@/contexts/user";

interface SignInProps {
	toggleAuthMode: (mode: string) => void;
}

const SignIn = ({ toggleAuthMode }: SignInProps) => {
	const { handleSetUser } = useUser();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleUsernameChange = (event: any) =>
		setUsername(event.target.value);

	const handlePasswordChange = (event: any) =>
		setPassword(event.target.value);

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (!username || !password) return;

		api.get(
			`/users?username=${username}&password=${password}`
		).then((response) => {
			localStorage.setItem(
				"user",
				JSON.stringify(response.data[0])
			);

			handleSetUser(response.data[0]);
		});
	};

	return (
		<form
			className="flex flex-col gap-4 min-w-[300px]"
			onSubmit={handleSubmit}
		>
			<h2 className="text-3xl uppercase font-bold text-center">
				Login
			</h2>

			{error && (
				<p className="bg-red-500 text-white p-2 text-center">
					{error}
				</p>
			)}

			<TextBox
				type="text"
				placeholder="Username"
				value={username}
				onChange={handleUsernameChange}
			/>
			<TextBox
				type="password"
				placeholder="Password"
				value={password}
				onChange={handlePasswordChange}
			/>

			<Button>Login</Button>

			<p className="text-sm text-center">
				Don&apos;t have an account ?
				<button
					type="button"
					className="text-blue-500 underline"
					onClick={() => toggleAuthMode("signup")}
				>
					Create one now
				</button>
			</p>
		</form>
	);
};

export default SignIn;
