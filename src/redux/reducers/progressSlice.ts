import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProgressState {
	mondstadt: number[];
	liyue: number[];
	dragonspine: number[];
	chasm: number[];
	inazuma: number[];
	enkanomiya: number[];
	sumeru: number[];
	fontaine: number[];
	chenyu: number[];
}

const initialState: ProgressState = {
	mondstadt: [],
	liyue: [],
	dragonspine: [],
	chasm: [],
	inazuma: [],
	enkanomiya: [],
	sumeru: [],
	fontaine: [],
	chenyu: [],
};

const progressSlice = createSlice({
	name: "progress",
	initialState,
	reducers: {
		setProgress(state, action: PayloadAction<{ region: keyof ProgressState; data: number[] }>) {
			state[action.payload.region] = action.payload.data;
		},
	},
});

export default progressSlice;
