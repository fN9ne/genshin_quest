import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
	isHideCompleted: boolean;
	isInCompleteFirst: boolean;
	isProgressLoaded: boolean;
}

const initialState: GlobalState = {
	isHideCompleted: false,
	isInCompleteFirst: false,
	isProgressLoaded: false,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		toggleIsHideCompleted(state, action: PayloadAction<boolean>) {
			state.isHideCompleted = action.payload;
		},
		toggleIsInCompleteFirst(state, action: PayloadAction<boolean>) {
			state.isInCompleteFirst = action.payload;
		},
		setProgressLoaded(state, action: PayloadAction<boolean>) {
			state.isProgressLoaded = action.payload;
		},
	},
});

export default globalSlice;
