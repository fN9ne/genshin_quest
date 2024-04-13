import globalSlice from "./reducers/globalSlice";
import progressBarSlice from "./reducers/progressBarSlice";
import progressSlice from "./reducers/progressSlice";

export default {
	...progressSlice.actions,
	...progressBarSlice.actions,
	...globalSlice.actions,
};
