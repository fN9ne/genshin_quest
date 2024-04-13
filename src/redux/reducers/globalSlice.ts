import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
	isHideCompleted: boolean;
	isInCompleteFirst: boolean;
}

const initialState: GlobalState = {
	isHideCompleted: false,
	isInCompleteFirst: false,
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
	},
});

export default globalSlice;
