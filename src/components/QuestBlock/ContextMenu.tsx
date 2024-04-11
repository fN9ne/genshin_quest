import { FC } from "react";

export interface MenuItem {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}

interface ContextMenuProps {
	x: number;
	y: number;
	items: MenuItem[];
	onClose: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
	return (
		<div className="context-menu" style={{ top: y, left: x, zIndex: 999 }}>
			<ul className="context-menu__wrapper">
				{items.map((item, index) => (
					<li
						className="context-menu__item"
						key={index}
						onClick={() => {
							item.onClick();
							onClose();
						}}
					>
						<div className="context-menu__icon">{item.icon}</div>
						<div className="context-menu__label">{item.label}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ContextMenu;
