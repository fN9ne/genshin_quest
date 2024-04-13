import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Quests from "./pages/Quests";
import useLocalStorage from "./hooks/useLocalStorage";
import { useActions } from "./hooks/useActions";
import { AnimatePresence as AP } from "framer-motion";
import Save from "./pages/Save";

const App: FC = () => {
	const { setActiveRegions, setProgress } = useActions();

	useLocalStorage("progressBarActiveRegions", setActiveRegions);
	useLocalStorage("progress", setProgress);

	const location = useLocation();

	return (
		<AP mode="wait" initial={false}>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<Quests />} />
					<Route path="save" element={<Save />} />
				</Route>
			</Routes>
		</AP>
	);
};

export default App;
