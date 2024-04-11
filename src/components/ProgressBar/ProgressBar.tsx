import { FC } from "react";
import ProgressBarItem, { ProgressBarItemProps } from "./ProgressBarItem";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useActions } from "../../hooks/useActions.ts";

interface Quests {
	mondstadt: number[];
	liyue: number[];
	dragonspine: number[];
	chasm: number[];
	inazuma: number[];
	enkanomiya: number[];
	sumeru: number[];
	fontaine: number[];
	chenyu: number[];
}

const ProgressBar: FC = () => {
	const { mondstadt, liyue, dragonspine, chasm, inazuma, enkanomiya, sumeru, fontaine, chenyu } = useAppSelector(
		(state) => state.progress
	);
	const regionIsActive = useAppSelector((state) => state.progressBar);
	const quests = useAppSelector((state) => state.quests);

	const getProgress = (array: number[], region: keyof Quests): number => {
		return (array.length / quests.regions[region].length) * 100;
	};

	const { setIsActiveRegion } = useActions();

	const regions: ProgressBarItemProps[] = [
		{
			background: "/regions/backgrounds/mondstadt.jpg",
			icon: "/regions/symbol/mondstadt.png",
			name: "Мондштадт",
			progress: getProgress(mondstadt, "mondstadt"),
			isActive: regionIsActive.mondstadt,
			onClick: () => setIsActiveRegion(["mondstadt", !regionIsActive.mondstadt]),
		},
		{
			background: "/regions/backgrounds/liyue.jpg",
			icon: "/regions/symbol/liyue.png",
			name: "Ли Юэ",
			progress: getProgress(liyue, "liyue"),
			isActive: regionIsActive.liyue,
			onClick: () => setIsActiveRegion(["liyue", !regionIsActive.liyue]),
		},
		{
			background: "/regions/backgrounds/dragonspine.jpg",
			icon: "/regions/symbol/dragonspine.png",
			name: "Драконий хребет",
			progress: getProgress(dragonspine, "dragonspine"),
			isActive: regionIsActive.dragonspine,
			onClick: () => setIsActiveRegion(["dragonspine", !regionIsActive.dragonspine]),
		},
		{
			background: "/regions/backgrounds/chasm.jpg",
			icon: "/regions/symbol/chasm.png",
			name: "Разлом",
			progress: getProgress(chasm, "chasm"),
			isActive: regionIsActive.chasm,
			onClick: () => setIsActiveRegion(["chasm", !regionIsActive.chasm]),
		},
		{
			background: "/regions/backgrounds/inazuma.jpg",
			icon: "/regions/symbol/inazuma.png",
			name: "Инадзума",
			progress: getProgress(inazuma, "inazuma"),
			isActive: regionIsActive.inazuma,
			onClick: () => setIsActiveRegion(["inazuma", !regionIsActive.inazuma]),
		},
		{
			background: "/regions/backgrounds/enkanomiya.jpg",
			icon: "/regions/symbol/enkanomiya.png",
			name: "Энканомия",
			progress: getProgress(enkanomiya, "enkanomiya"),
			isActive: regionIsActive.enkanomiya,
			onClick: () => setIsActiveRegion(["enkanomiya", !regionIsActive.enkanomiya]),
		},
		{
			background: "/regions/backgrounds/sumeru.jpg",
			icon: "/regions/symbol/sumeru.png",
			name: "Сумеру",
			progress: getProgress(sumeru, "sumeru"),
			isActive: regionIsActive.sumeru,
			onClick: () => setIsActiveRegion(["sumeru", !regionIsActive.sumeru]),
		},
		{
			background: "/regions/backgrounds/fontaine.jpg",
			icon: "/regions/symbol/fontaine.png",
			name: "Фонтейн",
			progress: getProgress(fontaine, "fontaine"),
			isActive: regionIsActive.fontaine,
			onClick: () => setIsActiveRegion(["fontaine", !regionIsActive.fontaine]),
		},
		{
			background: "/regions/backgrounds/chenyu.jpg",
			icon: "/regions/symbol/chenyu.png",
			name: "Долина Чэньюй",
			progress: getProgress(chenyu, "chenyu"),
			isActive: regionIsActive.chenyu,
			onClick: () => setIsActiveRegion(["chenyu", !regionIsActive.chenyu]),
		},
	];

	return (
		<>
			<div className="progress-bar">
				{regions.map((region, index) => (
					<ProgressBarItem {...region} key={index} />
				))}
			</div>
		</>
	);
};

export default ProgressBar;
