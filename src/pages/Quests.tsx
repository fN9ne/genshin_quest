import { FC } from "react";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import QuestBlock from "../components/QuestBlock/QuestBlock";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import { useAppSelector } from "../hooks/useAppSelector";
import questsData from "../quests.json";
import { IQuestsData } from "../types";
import AnimatePage from "../components/UI/AnimatePage";
import Loader from "../components/Loader";

const quests: IQuestsData = questsData;

const Quests: FC = () => {
	/* #UPDATEABLE */
	const { chasm, chenyu, dragonspine, enkanomiya, fontaine, inazuma, liyue, mondstadt, sumeru } = useAppSelector(
		(state) => state.progressBar
	);

	const { isProgressLoaded } = useAppSelector((state) => state.global);

	const progress = useAppSelector((state) => state.progress);
	const { isHideCompleted } = useAppSelector((state) => state.global);

	const transitions = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const isAllQuestsComplete = (): boolean => {
		const calculateQuests = (quests: typeof progress | IQuestsData): number => {
			return Object.keys(quests).reduce((prev, curr) => {
				return prev + quests[curr as keyof typeof progress].reduce((prev, curr) => prev + curr.content.length, 0);
			}, 0);
		};

		const allQuestsCount = calculateQuests(quests);
		const completedQuestsCount = calculateQuests(progress);

		return allQuestsCount === completedQuestsCount;
	};

	return (
		<AnimatePage className="quests">
			<div className="quests__container container">
				<ProgressBar />
				{!isProgressLoaded ? (
					<Loader className="quests__loader" />
				) : (
					<>
						{!isAllQuestsComplete() || !isHideCompleted ? (
							<>
								{/* #UPDATEABLE */}
								<AP mode="wait" initial={false}>
									{mondstadt && (
										<m.div key="mondstadt" {...transitions}>
											<QuestBlock quests={quests.mondstadt} region="mondstadt" name="Мондштадт" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{liyue && (
										<m.div key="liyue" {...transitions}>
											<QuestBlock quests={quests.liyue} region="liyue" name="Ли Юэ" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{dragonspine && (
										<m.div key="dragonspine" {...transitions}>
											<QuestBlock quests={quests.dragonspine} region="dragonspine" name="Драконий хребет" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{chasm && (
										<m.div key="chasm" {...transitions}>
											<QuestBlock quests={quests.chasm} region="chasm" name="Разлом" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{inazuma && (
										<m.div key="inazuma" {...transitions}>
											<QuestBlock quests={quests.inazuma} region="inazuma" name="Инадзума" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{enkanomiya && (
										<m.div key="enkanomiya" {...transitions}>
											<QuestBlock quests={quests.enkanomiya} region="enkanomiya" name="Энканомия" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{sumeru && (
										<m.div key="sumeru" {...transitions}>
											<QuestBlock quests={quests.sumeru} region="sumeru" name="Сумеру" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{fontaine && (
										<m.div key="fontaine" {...transitions}>
											<QuestBlock quests={quests.fontaine} region="fontaine" name="Фонтейн" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{chenyu && (
										<m.div key="chenyu" {...transitions}>
											<QuestBlock quests={quests.chenyu} region="chenyu" name="Долина Чэньюй" />
										</m.div>
									)}
								</AP>
							</>
						) : (
							<div className="quests__complete">
								Поздравляю! Ты выполнил все задания мира, теперь можешь сесть и подумать сколько часов ты мог потратить с пользой.
							</div>
						)}
					</>
				)}
			</div>
		</AnimatePage>
	);
};

export default Quests;
