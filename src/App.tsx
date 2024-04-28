import { FC, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Quests from "./pages/Quests";
import useLocalStorage from "./hooks/useLocalStorage";
import { useActions } from "./hooks/useActions";
import { AnimatePresence as AP } from "framer-motion";
import Save from "./pages/Save";
import { ProgressState } from "./redux/reducers/progressSlice";
import PatchModal from "./components/Modal/PatchModal";
import deletedQuests from "./deletedQuests.json";
import MigrationModal from "./components/Modal/MigrationModal";

interface IDeletedQuests {
	mondstadt?: number[];
	liyue?: number[];
	dragonspine?: number[];
	chasm?: number[];
	inazuma?: number[];
	enkanomiya?: number[];
	sumeru?: number[];
	fontaine?: number[];
	chenyu?: number[];
}

const App: FC = () => {
	const { setActiveRegions, setProgress, setInProgress, setProgressLoaded, setModal, setGlobalState, setNeedMigration } =
		useActions();

	const removeDeletedQuests = (progress: ProgressState, deletedQuests: IDeletedQuests): ProgressState => {
		const updatedProgress: ProgressState = { ...progress };

		for (const region in deletedQuests) {
			const regionName = region as keyof IDeletedQuests;

			if (regionName in updatedProgress) {
				const deletedContent = deletedQuests[regionName];

				updatedProgress[regionName] = updatedProgress[regionName].filter((questId) => !deletedContent!.includes(questId));
			}
		}

		return updatedProgress;
	};

	const handleLoadProgress = (data: any): void => {
		setProgress(removeDeletedQuests(data, deletedQuests));
		setProgressLoaded(true);
	};

	const handleLoadInProgress = (data: any): void => {
		setInProgress(removeDeletedQuests(data, deletedQuests));
	};

	const checkVersion = (data: any): void => {
		if (`${data}` !== `${import.meta.env.VITE_APP_VERSION}`) {
			setModal({ state: "isPatchNoteActive", value: true });
			localStorage.setItem("version", JSON.stringify(import.meta.env.VITE_APP_VERSION));
		}
	};

	useLocalStorage("progressBarActiveRegions", setActiveRegions);
	useLocalStorage("progress", handleLoadProgress);
	useLocalStorage("inProgress", handleLoadInProgress);
	useLocalStorage("global", setGlobalState);
	useLocalStorage("version", checkVersion);

	useEffect(() => {
		const storedProgress = localStorage.getItem("progress");

		if (!storedProgress) setProgressLoaded(true);
	}, []);

	useEffect(() => {
		const storedData = localStorage.getItem("version");

		if (!storedData) {
			localStorage.setItem("version", JSON.stringify(import.meta.env.VITE_APP_VERSION));
			setModal({ state: "isPatchNoteActive", value: true });
		}
	}, []);

	const location = useLocation();

	/* migration */

	useEffect(() => {
		const storedProgress = localStorage.getItem("progress");

		if (storedProgress) {
			if (typeof JSON.parse(storedProgress)["fontaine"][0] === "object") {
				setNeedMigration(true);
				setModal({ state: "isMigrationActive", value: true });
			}
		}
	}, []);

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
			<MigrationModal />
		</>
	);
};

export default App;
