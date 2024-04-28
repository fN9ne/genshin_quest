import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
	isHideCompleted: boolean;
	isInCompleteFirst: boolean;
	isProgressLoaded: boolean;
	isInProgressFirst: boolean;
	isNeedMigration: boolean | null;
}

const initialState: GlobalState = {
	isHideCompleted: false,
	isInCompleteFirst: false,
	isInProgressFirst: false,
	isProgressLoaded: false,
	isNeedMigration: null,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setGlobalState(state, action: PayloadAction<GlobalState>) {
			return {
				...state,
				...action.payload,
			};
		},
		toggleIsHideCompleted(state, action: PayloadAction<boolean>) {
			state.isHideCompleted = action.payload;

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
