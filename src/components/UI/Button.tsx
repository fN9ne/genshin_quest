import classNames from "classnames";
import { FC } from "react";

export enum ButtonType {
	primary = "primary",
	secondary = "secondary",
}

interface ButtonProps {
	type: ButtonType;
	onClick: () => void;
	children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ type, onClick, children }) => {
	const buttonClasses = classNames("button", `button_${type}`);

	return (
		<button className={buttonClasses} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
