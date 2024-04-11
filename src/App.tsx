import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Quests from "./pages/Quests";
import useLocalStorage from "./hooks/useLocalStorage";
import { useActions } from "./hooks/useActions";
import { questAPI } from "./services/questAPI";
import { useAppSelector } from "./hooks/useAppSelector";

const App: FC = () => {
	const { data } = questAPI.useFetchAllQuery();
	const [updateQuests] = questAPI.useUpdateMutation();

	const { setActiveRegions, setQuests } = useActions();

	const quests = useAppSelector((state) => state.quests);

	const adminModeCheck = (isAdminModeActive: boolean): void => {
		if (isAdminModeActive) {
			document.body.classList.add("admin-mode");
		} else {
			document.body.classList.remove("admin-mode");
		}
	};

	useLocalStorage("progressBarActiveRegions", setActiveRegions);
	useLocalStorage("isAdminMode", adminModeCheck);

	useEffect(() => {
		if (data) {
			setQuests(data.record);
		}
	}, [data]);

	useEffect(() => {
		if (quests.isNeedUpdate) {
			updateQuests(quests.regions);
		}
	}, [quests.isNeedUpdate]);

	return (
		<>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<Quests />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
