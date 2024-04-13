import globalSlice from "./reducers/globalSlice";
import modalSlice from "./reducers/modalSlice";
import progressBarSlice from "./reducers/progressBarSlice";
import progressSlice from "./reducers/progressSlice";

export default {
	...progressSlice.actions,
	...progressBarSlice.actions,
	...globalSlice.actions,
	...modalSlice.actions,
};
