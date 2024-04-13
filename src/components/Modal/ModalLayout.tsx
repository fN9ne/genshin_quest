import { FC } from "react";
import { AnimatePresence as AP, motion as m } from "framer-motion";

interface ModalLayoutProps {
	isActive: boolean;
	className?: string;
	onClose: () => void;
	children?: React.ReactNode;
}

const ModalLayout: FC<ModalLayoutProps> = ({ isActive, className, onClose, children }) => {
	const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
		const element = event.target as HTMLDivElement;

		if (!element.closest(".modal__content")) onClose();
	};

	const transitions = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<AP mode="wait" initial={false}>
			{isActive && (
				<m.div {...transitions} key="modal" className="modal" onClick={handleClose}>
					<div className="modal__body">
						<div className={`modal__content${className ? ` ${className}` : ""}`}>{children}</div>
					</div>
				</m.div>
			)}
		</AP>
	);
};

export default ModalLayout;
