import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
	children: ReactNode;
	mode: "auth" | "cart";
	toggleShow: (value: "auth" | "cart") => void;
}

const Modal = ({
	children,
	mode,
	toggleShow,
}: ModalProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: any) => {
			if (
				ref &&
				ref.current &&
				event.target.id !== mode &&
				!ref.current.contains(event.target)
			) {
				toggleShow(mode);
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener(
				"click",
				handleClick
			);
		};
	}, [ref, mode, toggleShow]);

	return (
		<div
			className="absolute right-0 top-full bg-white p-4 border shadow z-10"
			ref={ref}
		>
			{children}
		</div>
	);
};

export default Modal;
