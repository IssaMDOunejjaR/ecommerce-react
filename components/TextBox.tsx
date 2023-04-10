import { InputHTMLAttributes } from "react";

interface TextBoxProps
	extends InputHTMLAttributes<HTMLInputElement> {}

const TextBox = ({
	placeholder,
	...props
}: TextBoxProps) => {
	return (
		<label
			className="flex flex-col gap-1 text-sm w-full"
			htmlFor={placeholder}
		>
			{placeholder}

			<input
				placeholder={placeholder}
				id={placeholder}
				className="border border-gray-300 p-2 rounded flex-1"
				required
				{...props}
			/>
		</label>
	);
};

export default TextBox;
