import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/contexts/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({
	Component,
	pageProps,
}: AppProps) {
	return (
		<div className="flex flex-col min-h-screen gap-8">
			<UserProvider>
				<Navbar />

				<Component {...pageProps} />

				<Footer />
			</UserProvider>
		</div>
	);
}
