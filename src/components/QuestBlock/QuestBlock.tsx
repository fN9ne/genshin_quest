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
	const { searchQuery } = useAppSelector((state) => state.global);

	const { isHideCompletedSearch, isInCompleteFirst, isInProgressFirst } = useAppSelector((state) => state.global);

	const completedQuests = progress[region as keyof typeof progress].length;
	const totalQuests = quests.flatMap((subregion) => subregion.content).length;

	const isQuestStatus = (region: string, quest: IQuest, status: typeof progress | typeof inProgress) => {
		return status[region as keyof typeof progress].includes(quest.id);
	};

	const isAllSubRegionQuestsComplete = (subregionContent: number[], progress: number[]): boolean => {
		return subregionContent.every((questId) => progress.includes(questId));
	};

	const isSubRegionIncludesSearchedQuery = (subregion: ISubRegion): [boolean, boolean] => {
		return [
			subregion.content.map((quest) => quest.quest).some((name) => name.toLowerCase().includes(searchQuery.toLowerCase())),
			subregion.name.toLowerCase().includes(searchQuery.toLowerCase()),
		];
	};

	const regionInterpreter = (region: string): string => {
		/* #UPDATEABLE */
		if (["mondstadt", "dragonspine"].includes(region)) return "mondstadt";
		if (["liyue", "chasm", "chenyu"].includes(region)) return "liyue";
		if (["inazuma", "enkanomiya"].includes(region)) return "inazuma";

		return region;
	};

	return isHideCompletedSearch && completedQuests === totalQuests ? null : (
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
						(!isHideCompletedSearch ||
							!isAllSubRegionQuestsComplete(
								subregion.content.map((quest) => quest.id),
								progress[region as keyof typeof progress]
							)) &&
						isSubRegionIncludesSearchedQuery(subregion).some(Boolean) && (
							<div key={index} className="quest-block__subregion">
								{subregion.name !== "" && (
									<div className="quest-block__subregion-header">
										<div className="quest-block__subregion-name">{subregion.name}</div>
										{subregion.isReputation && (
											<div className="quest-item__reputation">
												<img src={`/regions/reputation/${regionInterpreter(region)}.webp`} alt="reputation exp icon" />
											</div>
										)}
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
										.filter((quest) =>
											!isSubRegionIncludesSearchedQuery(subregion)[1]
												? quest.quest.toLowerCase().includes(searchQuery.toLowerCase())
												: true
										)
										.map(
											(quest, index) =>
												(!isHideCompletedSearch || !isQuestStatus(region, quest, progress)) && (
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
