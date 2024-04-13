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
	const { isHideCompleted, isInCompleteFirst } = useAppSelector((state) => state.global);

	const completedQuests = progress[region as keyof typeof progress].flatMap((subregion) => subregion.content).length;
	const totalQuests = quests.flatMap((subregion) => subregion.content).length;

	const isQuestCompleted = (region: string, subregion: ISubRegion, quest: IQuest) => {
		return progress[region as keyof typeof progress]
			.filter((subregionItem) => subregionItem.name === subregion.name)[0]
			.content.includes(quest.id);
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
						(!isHideCompleted ||
							subregion.content.length !==
								progress[region as keyof typeof progress].filter((subregionItem) => subregionItem.name === subregion.name)[0]
									.content.length) && (
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
											if (isInCompleteFirst) {
												const aCompleted = isQuestCompleted(region, subregion, a);
												const bCompleted = isQuestCompleted(region, subregion, b);
												if (aCompleted && !bCompleted) return 1;
												if (!aCompleted && bCompleted) return -1;
											}
											return 0;
										})
										.map(
											(quest, index) =>
												(!isHideCompleted || !isQuestCompleted(region, subregion, quest)) && (
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
