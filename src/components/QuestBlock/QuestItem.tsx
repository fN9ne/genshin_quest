import { FC, useEffect, useRef, useState } from "react";

import Check from "../../img/icons/check.svg?react";
import Hourglass from "../../img/icons/hourglass.svg?react";

import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

import { ProgressState } from "../../redux/reducers/progressSlice";

export interface QuestItemProps {
	id: number;
	quest: string;
	source: string;
	link: string;
	isReputation: boolean;
}

const QuestItem: FC<QuestItemProps & { region: string; subregion: string }> = ({
	id,
	region,
	quest,
	source,
	subregion,
	isReputation,
	link,
}) => {
	const [shouldAnimateOut, setShouldAnimateOut] = useState<boolean>(false);

	const { setRegionProgress, setRegionInProgress } = useActions();
	const progress = useAppSelector((state) => state.progress);
	const inProgress = useAppSelector((state) => state.inProgress);
	const { isInCompleteFirst, isInProgressFirst, isHideCompleted } = useAppSelector((state) => state.global);

	const input = useRef<null | HTMLInputElement>(null);
	const inputInProgress = useRef<null | HTMLInputElement>(null);

	const regionInterpreter = (region: string): string => {
		/* #UPDATEABLE */
		if (["mondstadt", "dragonspine"].includes(region)) return "mondstadt";
		if (["liyue", "chasm", "chenyu"].includes(region)) return "liyue";
		if (["inazuma", "enkanomiya"].includes(region)) return "inazuma";

		return region;
	};

	const handleToggleProgress = (event: React.MouseEvent<HTMLLabelElement>) => {
		event.preventDefault();

		const element = input.current as HTMLInputElement;

		if (isHideCompleted) {
			if (!element.checked) {
				setShouldAnimateOut(true);
			}
		} else {
			setRegionProgress({ region: region as keyof ProgressState, id: id, subregion });
			setRegionInProgress({ region: region as keyof ProgressState, id: id, subregion, force: false });
		}
	};

	const handleToggleInProgress = (event: React.MouseEvent<HTMLLabelElement>) => {
		event.preventDefault();
		setRegionInProgress({ region: region as keyof ProgressState, id: id, subregion });
		setRegionProgress({ region: region as keyof ProgressState, id: id, subregion, force: false });
	};

	const onAnimationEnd = () => {
		if (shouldAnimateOut) {
			setRegionProgress({ region: region as keyof ProgressState, id: id, subregion });
			setRegionInProgress({ region: region as keyof ProgressState, id: id, subregion, force: false });
			setShouldAnimateOut(false);
		}
	};

	useEffect(() => {
		if (input.current) {
			const element = input.current as HTMLInputElement;

			element.checked = shouldAnimateOut
				? true
				: progress[region as keyof typeof progress]
						.filter((subregionItem) => subregionItem.name === subregion)[0]
						.content.includes(id);
		}
	}, [progress, isInCompleteFirst, isInProgressFirst, shouldAnimateOut]);

	useEffect(() => {
		if (inputInProgress.current) {
			const element = inputInProgress.current as HTMLInputElement;

			element.checked = inProgress[region as keyof typeof inProgress]
				.filter((subregionItem) => subregionItem.name === subregion)[0]
				.content.includes(id);
		}
	}, [inProgress, isInCompleteFirst, isInProgressFirst]);

	return (
		<div className={`quest-item ${shouldAnimateOut ? " animate-out" : ""}`} onAnimationEnd={onAnimationEnd}>
			<div className="quest-item__wrapper">
				<div className="quest-item__content">
					<div className="quest-item__name">
						<span>{quest}</span>
						{isReputation && (
							<div className="quest-item__reputation">
								<img src={`/regions/reputation/${regionInterpreter(region)}.webp`} alt="reputation exp icon" />
							</div>
						)}
					</div>
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
					<label className="quest-item-check quest-item-check__inprogress" onClick={handleToggleInProgress}>
						<button>
							<input type="checkbox" ref={inputInProgress} />
							<div className="quest-item-check__box">
								<div className="quest-item-check__wrapper">
									<Hourglass />
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
