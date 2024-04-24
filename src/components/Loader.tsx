import { FC } from "react";

interface LoaderProps {
	className?: string;
}

const Loader: FC<LoaderProps> = ({ className }) => {
	return className ? (
		<div className={className}>
			<div className="loader"></div>
		</div>
	) : (
		<div className="loader"></div>
	);
};

export default Loader;
