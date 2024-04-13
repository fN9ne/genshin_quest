import { FC, useEffect, useRef } from "react";

import Check from "../../img/icons/check.svg?react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

import { ProgressState } from "../../redux/reducers/progressSlice";

export interface QuestItemProps {
	id: number;
	quest: string;
	source: string;
	link: string;
}

const QuestItem: FC<QuestItemProps & { region: string; subregion: string }> = ({
	id,
	region,
	quest,
	source,
	subregion,
	link,
}) => {
	const { setRegionProgress } = useActions();
	const progress = useAppSelector((state) => state.progress);
	const { isInCompleteFirst } = useAppSelector((state) => state.global);

	const input = useRef<null | HTMLInputElement>(null);

	const handleToggleProgress = (event: React.MouseEvent<HTMLLabelElement>) => {
		event.preventDefault();

		const array = progress[region as keyof typeof progress];
		const element = input.current as HTMLInputElement;
		const newItems = element.checked
			? array.filter((subregionItem) => subregionItem.name === subregion)[0].content.filter((item) => item !== id)
			: [...array.filter((subregionItem) => subregionItem.name === subregion)[0].content, id];

		setRegionProgress({ region: region as keyof ProgressState, data: newItems, subregion });
	};

	useEffect(() => {
		if (input.current) {
			const element = input.current as HTMLInputElement;

			element.checked = progress[region as keyof typeof progress]
				.filter((subregionItem) => subregionItem.name === subregion)[0]
				.content.includes(id);
		}
	}, [progress, isInCompleteFirst]);

	return (
		<div className="quest-item" id={`quest-${id}`}>
			<div className="quest-item__wrapper">
				<div className="quest-item__content">
					<div className="quest-item__name">{quest}</div>
					<div className="quest-item__source">{source.slice(0, 1).toUpperCase() + source.slice(1, -1)}</div>
					{link && (
						<a href={link} target="_blank" className="quest-item__link">
							Подробнее
						</a>
					)}
				</div>
				<div className="quest-item__actions">
					<label className="quest-item-check" onClick={handleToggleProgress}>
						<button>
							<input type="checkbox" ref={input} />
							<div className="quest-item-check__box">
								<div className="quest-item-check__wrapper">
									<Check />
								</div>
							</div>
						</button>
					</label>
				</div>
			</div>
		</div>
	);
};

export default QuestItem;
