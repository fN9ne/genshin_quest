import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubRegion {
	name: string;
	content: number[];
}

export interface OldProgressState {
	mondstadt: SubRegion[];
	liyue: SubRegion[];
	dragonspine: SubRegion[];
	chasm: SubRegion[];
	inazuma: SubRegion[];
	enkanomiya: SubRegion[];
	sumeru: SubRegion[];
	fontaine: SubRegion[];
	chenyu: SubRegion[];
}

/* #UPDATEABLE */
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

/* #UPDATEABLE */
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
		setProgress(_, action: PayloadAction<ProgressState>) {
			return action.payload;
		},
		setRegionProgress(state, action: PayloadAction<{ region: keyof ProgressState; id: number; force?: boolean }>) {
			const { region, id, force } = action.payload;

			const toggle = (): number[] => {
				return state[region].includes(id) ? state[region].filter((itemId) => itemId !== id) : [...state[region], id];
			};

			const update = (value: boolean): number[] => {
				if (value) {
					if (!state[region].includes(id)) {
						return [...state[region], id];
					}

					return state[region];
				} else {
					if (state[region].includes(id)) {
						return state[region].filter((itemId) => itemId !== id);
					}

					return state[region];
				}
			};

			const newState = force === undefined ? toggle() : update(force);

			state[region] = newState;

			localStorage.setItem(
				"progress",
				JSON.stringify({
					...state,
					[region]: newState,
				})
			);
		},
	},
});

export default progressSlice;
