import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* #UPDATEABLE */
export interface InProgressState {
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
const initialState: InProgressState = {
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

const inProgressSlice = createSlice({
	name: "progress",
	initialState,
	reducers: {
		setInProgress(_, action: PayloadAction<InProgressState>) {
			return action.payload;
		},
		setRegionInProgress(state, action: PayloadAction<{ region: keyof InProgressState; id: number; force?: boolean }>) {
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
				"inProgress",
				JSON.stringify({
					...state,
					[region]: newState,
				})
			);
		},
	},
});

export default inProgressSlice;
