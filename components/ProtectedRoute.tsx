import { useUser } from "@/contexts/user";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({
	children,
}: {
	children: ReactNode;
}) => {
	const {
		state: { user, isLoadingData },
	} = useUser();
	const { push } = useRouter();

	useEffect(() => {
		if (!isLoadingData && !user) {
			push("/");
		}
	}, [user, push, isLoadingData]);

	if (isLoadingData) return null;

	return <>{children}</>;
};

export default ProtectedRoute;
