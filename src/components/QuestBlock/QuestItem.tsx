import { FC, useEffect, useRef, useState } from "react";

import Check from "../../img/icons/check.svg?react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

import { ProgressState } from "../../redux/reducers/progressSlice";
import ContextMenu, { MenuItem } from "./ContextMenu";

import EditIcon from "../../img/icons/edit.svg?react";
import DeleteIcon from "../../img/icons/delete.svg?react";

export interface QuestItemProps {
	id: number;
	quest: string;
	source: string;
	link: string;
}

interface ContextMenuState {
	x: number;
	y: number;
	visible: boolean;
}

const QuestItem: FC<QuestItemProps & { region: string }> = ({ id, region, quest, source, link }) => {
	const { setProgress, questRemove } = useActions();

	const [contextMenu, setContextMenu] = useState<ContextMenuState>({ x: 0, y: 0, visible: false });

	const progress = useAppSelector((state) => state.progress);

	const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>): void => {
		if (isAdminMode()) {
			event.preventDefault();

			setContextMenu({
				x: event.clientX,
				y: event.clientY,
				visible: true,
			});
		}
	};

	const handleCloseContextMenu = (): void => {
		setContextMenu({
			...contextMenu,
			visible: false,
		});
	};

	const contextMenuItems: MenuItem[] = [
		{
			icon: <EditIcon />,
			label: "Редактировать",
			onClick: () => {},
		},
		{
			icon: <DeleteIcon />,
			label: "Удалить",
			onClick: () => {
				questRemove({ id, region: region as keyof typeof progress });
			},
		},
	];

	const menuRef = useRef<HTMLDivElement>(null);

	const handleClickOutsideMenu = (event: MouseEvent): void => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			handleCloseContextMenu();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutsideMenu);

		return () => document.removeEventListener("click", handleClickOutsideMenu);
	}, []);

	const input = useRef<null | HTMLInputElement>(null);

	const handleToggleProgress = (event: React.MouseEvent<HTMLLabelElement>) => {
		event.preventDefault();

		const array = progress[region as keyof typeof progress];
		const element = input.current as HTMLInputElement;
		const newItems = element.checked ? array.filter((item) => item !== id) : [...array, id];

		setProgress({ region: region as keyof ProgressState, data: newItems });
	};

	const isAdminMode = (): boolean => {
		const storedData = localStorage.getItem("isAdminMode");

		if (storedData) {
			const parsedData = JSON.parse(storedData);

			return parsedData;
		}

		return false;
	};

	useEffect(() => {
		const element = input.current as HTMLInputElement;

		element.checked = progress[region as keyof typeof progress].includes(id);
	}, [progress]);

	return (
		<div className="quest-item" onContextMenu={handleContextMenu} onClick={handleCloseContextMenu}>
			{contextMenu.visible && (
				<div ref={menuRef}>
					<ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextMenuItems} onClose={handleCloseContextMenu} />
				</div>
			)}
			<div className="quest-item__wrapper">
				<div className="quest-item__content">
					<div className="quest-item__name">{quest}</div>
					<div className="quest-item__source">{source}</div>
					<a href={link} target="_blank" className="quest-item__link">
						Ссылка на прохождение
					</a>
				</div>
				<div className="quest-item__actions">
					<label className="quest-item-check" onClick={handleToggleProgress}>
						<input type="checkbox" ref={input} />
						<div className="quest-item-check__box">
							<div className="quest-item-check__wrapper">
								<Check />
							</div>
						</div>
					</label>
				</div>
			</div>
		</div>
	);
};

export default QuestItem;
