import progressBarSlice from "./reducers/progressBarSlice";
import progressSlice from "./reducers/progressSlice";
import questsSlice from "./reducers/questsSlice";

export default {
	...progressSlice.actions,
	...progressBarSlice.actions,
	...questsSlice.actions,
};
