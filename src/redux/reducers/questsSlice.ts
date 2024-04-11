import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuest } from "../../types";

export interface QuestsState {
	regions: {
		mondstadt: IQuest[];
		liyue: IQuest[];
		dragonspine: IQuest[];
		chasm: IQuest[];
		inazuma: IQuest[];
		enkanomiya: IQuest[];
		sumeru: IQuest[];
		fontaine: IQuest[];
		chenyu: IQuest[];
	};
	isNeedUpdate: boolean;
	isFetching: boolean;
}

const initialState: QuestsState = {
	regions: {
		mondstadt: [],
		liyue: [],
		dragonspine: [],
		chasm: [],
		inazuma: [],
		enkanomiya: [],
		sumeru: [],
		fontaine: [],
		chenyu: [],
	},
	isNeedUpdate: false,
	isFetching: true,
};

const questsSlice = createSlice({
	name: "quests",
	initialState,
	reducers: {
		setQuests(state, action: PayloadAction<QuestsState["regions"]>) {
			state.regions = action.payload;
		},
		questRemove(state, action: PayloadAction<{ id: number; region: keyof QuestsState["regions"] }>) {
			state.regions[action.payload.region] = state.regions[action.payload.region].filter(
				(_, index) => index !== action.payload.id
			);
			state.isNeedUpdate = true;
		},
		questAdd(state, action: PayloadAction<{ quest: IQuest; region: keyof QuestsState["regions"] }>) {
			state.regions[action.payload.region] = [...state.regions[action.payload.region], action.payload.quest];
			state.isNeedUpdate = true;
		},
		checkQuestsUpdated(state) {
			state.isNeedUpdate = false;
		},
		updateQuestsFetching(state, action: PayloadAction<boolean>) {
			state.isFetching = action.payload;
		},
	},
});

export default questsSlice;
