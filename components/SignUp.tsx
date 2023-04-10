import { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import { api } from "@/hooks/useFetchLocal";
import { useUser } from "@/contexts/user";

interface SignInProps {
	toggleAuthMode: (mode: string) => void;
}

const SignUp = ({ toggleAuthMode }: SignInProps) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleUsernameChange = (event: any) =>
		setUsername(event.target.value);

	const handleEmailChange = (event: any) =>
		setEmail(event.target.value);

	const handlePasswordChange = (event: any) =>
		setPassword(event.target.value);

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (!email || !username || !password) return;

		api.post("/users", {
			username,
			password,
			email,
			cart: [],
			orders: [],
		})
			.then(() => {
				toggleAuthMode("signin");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form
			className="flex flex-col gap-4 min-w-[300px]"
			onSubmit={handleSubmit}
		>
			<h2 className="text-2xl uppercase font-bold text-center">
				Create an account
			</h2>

			<TextBox
				type="text"
				placeholder="Username"
				value={username}
				onChange={handleUsernameChange}
			/>
			<TextBox
				type="email"
				placeholder="Email"
				value={email}
				onChange={handleEmailChange}
			/>
			<TextBox
				type="password"
				placeholder="Password"
				value={password}
				onChange={handlePasswordChange}
			/>

			<Button>Register</Button>

			<p className="text-sm text-center">
				Already have an account ?
				<button
					type="button"
					className="text-blue-500 underline"
					onClick={() => toggleAuthMode("signin")}
				>
					Login
				</button>
			</p>
		</form>
	);
};

export default SignUp;
