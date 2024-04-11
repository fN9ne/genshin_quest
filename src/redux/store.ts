import { combineReducers, configureStore } from "@reduxjs/toolkit";
import progressSlice from "./reducers/progressSlice";
import progressBarSlice from "./reducers/progressBarSlice";
import { questAPI } from "../services/questAPI";
import questsSlice from "./reducers/questsSlice";

const rootReducer = combineReducers({
	progress: progressSlice.reducer,
	progressBar: progressBarSlice.reducer,
	quests: questsSlice.reducer,
	[questAPI.reducerPath]: questAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddlewar) => getDefaultMiddlewar().concat(questAPI.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
