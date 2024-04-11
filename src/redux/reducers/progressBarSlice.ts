import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface progressBarState {
	mondstadt: boolean;
	liyue: boolean;
	dragonspine: boolean;
	chasm: boolean;
	inazuma: boolean;
	enkanomiya: boolean;
	sumeru: boolean;
	fontaine: boolean;
	chenyu: boolean;
}

const initialState: progressBarState = {
	mondstadt: true,
	liyue: true,
	dragonspine: true,
	chasm: true,
	inazuma: true,
	enkanomiya: true,
	sumeru: true,
	fontaine: true,
	chenyu: true,
};

const progressBarSlice = createSlice({
	name: "progressBar",
	initialState,
	reducers: {
		setActiveRegions(_, action: PayloadAction<progressBarState>) {
			return action.payload;
		},
		setIsActiveRegion(state, action: PayloadAction<[keyof progressBarState, boolean]>) {
			const newState = {
				...state,
				[`${action.payload[0]}`]: action.payload[1],
			};

			localStorage.setItem("progressBarActiveRegions", JSON.stringify(newState));

			return newState;
		},
	},
});

export default progressBarSlice;
