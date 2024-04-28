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
import { useAppSelector } from "./hooks/useAppSelector";

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
	const { searchQuery, isHideCompleted } = useAppSelector((state) => state.global);

	const {
		setActiveRegions,
		setProgress,
		setInProgress,
		setProgressLoaded,
		setModal,
		setGlobalState,
		setNeedMigration,
		toggleIsHideCompletedSearch,
	} = useActions();

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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && ["f", "а"].includes(event.key)) {
				event.preventDefault();

				const searchInput = document.querySelector(".search-line input") as HTMLInputElement;
				const rect = searchInput.getBoundingClientRect();

				if (searchInput) {
					document.querySelector(".wrapper")!.scrollTo({
						top: 0,
						behavior: "smooth",
					});

					let timeout: number;

					if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth) {
						timeout = 0;
					} else {
						timeout = 500;
					}

					setTimeout(() => {
						searchInput.focus();
					}, timeout);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (isHideCompleted) {
			if (searchQuery.length > 0) {
				toggleIsHideCompletedSearch(false);
			} else {
				toggleIsHideCompletedSearch(isHideCompleted);
			}
		}
	}, [searchQuery]);

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
