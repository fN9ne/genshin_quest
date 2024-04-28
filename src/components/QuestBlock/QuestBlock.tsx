import { FC } from "react";
import QuestItem from "./QuestItem";
import { IQuest, ISubRegion } from "../../types";
import { useAppSelector } from "../../hooks/useAppSelector";

interface QuestBlockProps {
	quests: ISubRegion[];
	name: string;
	region: string;
}

const QuestBlock: FC<QuestBlockProps> = ({ quests, region, name }) => {
	const progress = useAppSelector((state) => state.progress);
	const inProgress = useAppSelector((state) => state.inProgress);
	const { isHideCompleted, isInCompleteFirst, isInProgressFirst } = useAppSelector((state) => state.global);

	const completedQuests = progress[region as keyof typeof progress].length;
	const totalQuests = quests.flatMap((subregion) => subregion.content).length;

	const isQuestStatus = (region: string, quest: IQuest, status: typeof progress | typeof inProgress) => {
		return status[region as keyof typeof progress].includes(quest.id);
	};

	return isHideCompleted && completedQuests === totalQuests ? null : (
		<div className="quest-block">
			<div className="quest-block__name">
				<img src={`/regions/symbol/${region}.png`} alt={`${region} icon`} />
				<span>{name}</span>
				<div>
					({completedQuests}/{totalQuests})
				</div>
			</div>
			<div className="quest-block__container">
				{quests.map(
					(subregion, index) =>
						(!isHideCompleted || subregion.content.length !== progress[region as keyof typeof progress].length) && (
							<div key={index} className="quest-block__subregion">
								{subregion.name !== "" && (
									<div className="quest-block__subregion-header">
										<div className="quest-block__subregion-name">{subregion.name}</div>
									</div>
								)}
								<div className="quest-block__content">
									{subregion.content
										.slice()
										.sort((a, b) => {
											if (isInCompleteFirst && !isInProgressFirst) {
												const aCompleted = isQuestStatus(region, a, progress);
												const bCompleted = isQuestStatus(region, b, progress);
												if (aCompleted && !bCompleted) return 1;
												if (!aCompleted && bCompleted) return -1;
											} else if (!isInCompleteFirst && isInProgressFirst) {
												const aInProgress = isQuestStatus(region, a, inProgress);
												const bInProgress = isQuestStatus(region, b, inProgress);
												if (aInProgress && !bInProgress) return -1;
												if (!aInProgress && bInProgress) return 1;
											}
											return 0;
										})
										.map(
											(quest, index) =>
												(!isHideCompleted || !isQuestStatus(region, quest, progress)) && (
													<QuestItem subregion={subregion.name} {...quest} region={region} key={index} />
												)
										)}
								</div>
							</div>
						)
				)}
			</div>
		</div>
	);
};

export default QuestBlock;
