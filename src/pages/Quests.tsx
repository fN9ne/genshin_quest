import { FC } from "react";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import QuestBlock from "../components/QuestBlock/QuestBlock";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import { useAppSelector } from "../hooks/useAppSelector";
import questsData from "../quests.json";
import { IQuestsData } from "../types";
import AnimatePage from "../components/UI/AnimatePage";
import SearchLine from "../components/SearchLine";

const quests: IQuestsData = questsData;

const Quests: FC = () => {
	/* #UPDATEABLE */
	const { chasm, chenyu, dragonspine, enkanomiya, fontaine, inazuma, liyue, mondstadt, sumeru } = useAppSelector(
		(state) => state.progressBar
	);

	const progress = useAppSelector((state) => state.progress);
	const { isHideCompleted, isProgressLoaded, searchQuery } = useAppSelector((state) => state.global);

	const transitions = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const isAllQuestsComplete = (): boolean => {
		const calculateQuests = (questsProgress?: typeof progress, quests?: IQuestsData): number => {
			const regions = Object.keys(questsProgress ? questsProgress : quests ? quests : []);

			if (questsProgress) {
				return regions.reduce((prev, curr) => {
					const region = curr as keyof typeof progress;
					return prev + questsProgress[region].length;
				}, 0);
			}
			if (quests) {
				return regions.reduce((prev, curr) => {
					const region = curr as keyof IQuestsData;

					return prev + quests[region].reduce((prev, curr) => prev + curr.content.length, 0);
				}, 0);
			}
			return -1;
		};

		const allQuestsCount = calculateQuests(undefined, quests);
		const completedQuestsCount = calculateQuests(progress);

		return allQuestsCount === completedQuestsCount;
	};

	const isRegionIncludesSearchedQuery = (region: keyof typeof quests): boolean => {
		return [
			quests[region]
				.flatMap((subregion) => subregion.name)
				.some((subregionName) => subregionName.toLowerCase().includes(searchQuery.toLowerCase())),
			quests[region]
				.flatMap((subregion) => subregion.content)
				.map((quest) => quest.quest)
				.some((questName) => questName.toLowerCase().includes(searchQuery.toLowerCase())),
		].some(Boolean);
	};

	return (
		<AnimatePage className="quests">
			<div className="quests__container container">
				<ProgressBar />
				<SearchLine />
				{isProgressLoaded && (
					<>
						{!isAllQuestsComplete() || !isHideCompleted ? (
							<>
								{/* #UPDATEABLE */}
								<AP mode="wait" initial={false}>
									{mondstadt && isRegionIncludesSearchedQuery("mondstadt") && (
										<m.div key="mondstadt" {...transitions}>
											<QuestBlock quests={quests.mondstadt} region="mondstadt" name="Мондштадт" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{liyue && isRegionIncludesSearchedQuery("liyue") && (
										<m.div key="liyue" {...transitions}>
											<QuestBlock quests={quests.liyue} region="liyue" name="Ли Юэ" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{dragonspine && isRegionIncludesSearchedQuery("dragonspine") && (
										<m.div key="dragonspine" {...transitions}>
											<QuestBlock quests={quests.dragonspine} region="dragonspine" name="Драконий хребет" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{chasm && isRegionIncludesSearchedQuery("chasm") && (
										<m.div key="chasm" {...transitions}>
											<QuestBlock quests={quests.chasm} region="chasm" name="Разлом" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{inazuma && isRegionIncludesSearchedQuery("inazuma") && (
										<m.div key="inazuma" {...transitions}>
											<QuestBlock quests={quests.inazuma} region="inazuma" name="Инадзума" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{enkanomiya && isRegionIncludesSearchedQuery("enkanomiya") && (
										<m.div key="enkanomiya" {...transitions}>
											<QuestBlock quests={quests.enkanomiya} region="enkanomiya" name="Энканомия" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{sumeru && isRegionIncludesSearchedQuery("sumeru") && (
										<m.div key="sumeru" {...transitions}>
											<QuestBlock quests={quests.sumeru} region="sumeru" name="Сумеру" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{fontaine && isRegionIncludesSearchedQuery("fontaine") && (
										<m.div key="fontaine" {...transitions}>
											<QuestBlock quests={quests.fontaine} region="fontaine" name="Фонтейн" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{chenyu && isRegionIncludesSearchedQuery("chenyu") && (
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
