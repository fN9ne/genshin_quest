import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
	isHideCompleted: boolean;
	isHideCompletedSearch: boolean;
	isInCompleteFirst: boolean;
	isProgressLoaded: boolean;
	isInProgressFirst: boolean;
	isNeedMigration: boolean | null;
	searchQuery: string;
}

const initialState: GlobalState = {
	isHideCompleted: false,
	isHideCompletedSearch: false,
	isInCompleteFirst: false,
	isInProgressFirst: false,
	isProgressLoaded: false,
	isNeedMigration: null,
	searchQuery: "",
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setSearchQuery(state, action: PayloadAction<string>) {
			state.searchQuery = action.payload;
		},
		setGlobalState(state, action: PayloadAction<GlobalState>) {
			return {
				...state,
				...action.payload,
			};
		},
		toggleIsHideCompleted(state, action: PayloadAction<boolean>) {
			state.isHideCompleted = action.payload;
			state.isHideCompletedSearch = action.payload;

			localStorage.setItem(
				"global",
				JSON.stringify({
					isHideCompleted: action.payload,
					isInCompleteFirst: state.isInCompleteFirst,
					isInProgressFirst: state.isInProgressFirst,
				})
			);
		},
		toggleIsHideCompletedSearch(state, action: PayloadAction<boolean>) {
			state.isHideCompletedSearch = action.payload;

			localStorage.setItem(
				"global",
				JSON.stringify({
					isHideCompleted: action.payload,
					isInCompleteFirst: state.isInCompleteFirst,
					isInProgressFirst: state.isInProgressFirst,
				})
			);
		},
		toggleIsInCompleteFirst(state, action: PayloadAction<boolean>) {
			state.isInCompleteFirst = action.payload;

			localStorage.setItem(
				"global",
				JSON.stringify({
					isHideCompleted: state.isHideCompleted,
					isInCompleteFirst: action.payload,
					isInProgressFirst: state.isInProgressFirst,
				})
			);
		},
		toggleIsInProgressFirst(state, action: PayloadAction<boolean>) {
			state.isInProgressFirst = action.payload;

			localStorage.setItem(
				"global",
				JSON.stringify({
					isHideCompleted: state.isHideCompleted,
					isInCompleteFirst: state.isInCompleteFirst,
					isInProgressFirst: action.payload,
				})
			);
		},
		setProgressLoaded(state, action: PayloadAction<boolean>) {
			state.isProgressLoaded = action.payload;
		},
		setNeedMigration(state, action: PayloadAction<boolean | null>) {
			state.isNeedMigration = action.payload;
		},
	},
});

export default globalSlice;
