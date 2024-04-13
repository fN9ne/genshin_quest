import { FC, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Quests from "./pages/Quests";
import useLocalStorage from "./hooks/useLocalStorage";
import { useActions } from "./hooks/useActions";
import { AnimatePresence as AP } from "framer-motion";
import Save from "./pages/Save";
import { useAppSelector } from "./hooks/useAppSelector";
import { IQuestsData } from "./types";
import questData from "./quests.json";
import { ProgressState } from "./redux/reducers/progressSlice";
import PatchModal from "./components/Modal/PatchModal";

const quests: IQuestsData = questData;

export const updateProgress = (progress: ProgressState, database: IQuestsData): ProgressState => {
	let progressData = { ...progress };

	Object.keys(database).forEach((regionKey) => {
		const region = regionKey as keyof ProgressState;

		if (!progressData.hasOwnProperty(region)) {
			progressData[region] = [{ name: "", content: [] }];
		}

		database[region].forEach((subregion) => {
			const subregionName = subregion.name;

			if (!progressData[region].some((item) => item.name === subregionName)) {
				const prev = progressData[region].slice(0, database[region].indexOf(subregion));
				const next = progressData[region].slice(database[region].indexOf(subregion));
				progressData[region] = [...prev, { name: subregionName, content: [] }, ...next];
			}
		});
	});

	return progressData;
};

const App: FC = () => {
	const { setActiveRegions, setProgress, setProgressLoaded, setModal } = useActions();
	const progress = useAppSelector((state) => state.progress);
	const global = useAppSelector((state) => state.global);

	const handleLoadProgress = (data: any): void => {
		setProgress(data);
		setProgressLoaded(true);
	};

	const checkVersion = (data: any): void => {
		if (data + "" !== import.meta.env.VITE_APP_VERSION) {
			setModal({ state: "isPatchNoteActive", value: true });
			localStorage.setItem("version", import.meta.env.VITE_APP_VERSION);
		}
	};

	useLocalStorage("progressBarActiveRegions", setActiveRegions);
	useLocalStorage("progress", handleLoadProgress);
	useLocalStorage("version", checkVersion);

	useEffect(() => {
		const storedData = localStorage.getItem("version");

		if (!storedData) {
			localStorage.setItem("version", import.meta.env.VITE_APP_VERSION);
			setModal({ state: "isPatchNoteActive", value: true });
		}
	}, []);

	const location = useLocation();

	const calculateQuests = (quests: typeof progress | IQuestsData): number => {
		return Object.keys(quests)
			.map((region) => {
				return quests[region as keyof typeof progress].map((item) => item.content.length);
			})
			.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + curr), 0);
	};

	useEffect(() => {
		if (global.isProgressLoaded) {
			const dataQuestCount = calculateQuests(quests);
			const storedData = localStorage.getItem("progress");

			if (storedData) {
				const storedDataQuestCount = calculateQuests(JSON.parse(storedData));

				if (dataQuestCount > storedDataQuestCount) {
					const newProgress = updateProgress(progress, quests);

					setProgress(newProgress);
					localStorage.setItem("progress", JSON.stringify(newProgress));
				}
			}
		}
	}, [global.isProgressLoaded]);

	return (
		<>
			<AP mode="wait" initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Quests />} />
						<Route path="save" element={<Save />} />
					</Route>
				</Routes>
			</AP>
			<PatchModal />
		</>
	);
};

export default App;
