import { FC } from "react";
import QuestItem, { QuestItemProps } from "./QuestItem";

interface QuestBlockProps {
	quests: QuestItemProps[];
	name: string;
	region: string;
}

const QuestBlock: FC<QuestBlockProps> = ({ quests, region, name }) => {
	return (
		<div className="quest-block">
			<div className="quest-block__name">{name}</div>
			<div className="quest-block__content">
				{quests.map((quest, index) => (
					<QuestItem {...quest} region={region} key={index} />
				))}
			</div>
		</div>
	);
};

export default QuestBlock;