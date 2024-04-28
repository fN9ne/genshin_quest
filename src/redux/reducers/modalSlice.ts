import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
	isPatchNoteActive: boolean;
	isMigrationActive: boolean;
}

const initialState: ModalState = {
	isPatchNoteActive: false,
	isMigrationActive: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleModal(state, action: PayloadAction<keyof ModalState>) {
			state[action.payload] = !state[action.payload];
		},
		setModal(state, action: PayloadAction<{ state: keyof ModalState; value: boolean }>) {
			state[action.payload.state] = action.payload.value;
		},
	},
});

export default modalSlice;
