import { combineReducers, configureStore } from "@reduxjs/toolkit";
import progressSlice from "./reducers/progressSlice";
import progressBarSlice from "./reducers/progressBarSlice";
import globalSlice from "./reducers/globalSlice";

const rootReducer = combineReducers({
	progress: progressSlice.reducer,
	progressBar: progressBarSlice.reducer,
	global: globalSlice.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
