import { FC } from "react";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import QuestBlock from "../components/QuestBlock/QuestBlock";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import { useAppSelector } from "../hooks/useAppSelector";
import Loader from "../components/Loader";

const Quests: FC = () => {
	const { chasm, chenyu, dragonspine, enkanomiya, fontaine, inazuma, liyue, mondstadt, sumeru } = useAppSelector(
		(state) => state.progressBar
	);

	const quests = useAppSelector((state) => state.quests);

	const transitions = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<div className="quests">
			<div className="quests__container container">
				<AP mode="wait" initial={false}>
					{quests.isFetching ? (
						<m.div key="loader" {...transitions} className="quests__loader">
							<Loader />
						</m.div>
					) : (
						<>
							<ProgressBar />
							<m.div key="content" {...transitions} className="quests__blocks">
								<AP mode="wait" initial={false}>
									{mondstadt && (
										<m.div key="mondstadt" {...transitions}>
											<QuestBlock quests={quests.regions.mondstadt} region="mondstadt" name="Мондштадт" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{liyue && (
										<m.div key="liyue" {...transitions}>
											<QuestBlock quests={quests.regions.liyue} region="liyue" name="Ли Юэ" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{dragonspine && (
										<m.div key="dragonspine" {...transitions}>
											<QuestBlock quests={quests.regions.dragonspine} region="dragonspine" name="Драконий хребет" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{chasm && (
										<m.div key="chasm" {...transitions}>
											<QuestBlock quests={quests.regions.chasm} region="chasm" name="Разлом" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{inazuma && (
										<m.div key="inazuma" {...transitions}>
											<QuestBlock quests={quests.regions.inazuma} region="inazuma" name="Инадзума" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{enkanomiya && (
										<m.div key="enkanomiya" {...transitions}>
											<QuestBlock quests={quests.regions.enkanomiya} region="enkanomiya" name="Энканомия" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{sumeru && (
										<m.div key="sumeru" {...transitions}>
											<QuestBlock quests={quests.regions.sumeru} region="sumeru" name="Сумеру" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{fontaine && (
										<m.div key="fontaine" {...transitions}>
											<QuestBlock quests={quests.regions.fontaine} region="fontaine" name="Фонтейн" />
										</m.div>
									)}
								</AP>
								<AP mode="wait" initial={false}>
									{chenyu && (
										<m.div key="chenyu" {...transitions}>
											<QuestBlock quests={quests.regions.chenyu} region="chenyu" name="Долина Чэньюй" />
										</m.div>
									)}
								</AP>
							</m.div>
						</>
					)}
				</AP>
			</div>
		</div>
	);
};

export default Quests;
