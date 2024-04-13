import { FC } from "react";
import { motion as m } from "framer-motion";

interface AnimatePageProps {
	className?: string;
	children: React.ReactNode;
}

const AnimatePage: FC<AnimatePageProps> = ({ className, children }) => {
	const transitions = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<m.div {...transitions} className={className}>
			{children}
		</m.div>
	);
};

export default AnimatePage;
