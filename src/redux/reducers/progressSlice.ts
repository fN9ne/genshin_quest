import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubRegion {
	name: string;
	content: number[];
}

/* #UPDATEABLE */
export interface ProgressState {
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
const initialState: ProgressState = {
	mondstadt: [{ name: "", content: [] }],
	liyue: [{ name: "", content: [] }],
	dragonspine: [{ name: "", content: [] }],
	chasm: [{ name: "", content: [] }],
	inazuma: [
		{ name: "Остров Наруками", content: [] },
		{ name: "Каннадзука", content: [] },
		{ name: "Остров Ясиори", content: [] },
		{ name: "Сэйрай", content: [] },
		{ name: "Ватацуми", content: [] },
		{ name: "Цуруми", content: [] },
	],
	enkanomiya: [{ name: "", content: [] }],
	sumeru: [
		{ name: "Встреча в лесу: Араньяка. Том I", content: [] },
		{ name: "Питомник грез: Араньяка. Том II", content: [] },
		{ name: "Питомник утраченных грез: Араньяка. Том III", content: [] },
		{ name: "В конце концов, лес помнит все: Араньяка. Том IV", content: [] },
		{ name: "Кулинарная мечта", content: [] },
		{ name: "Вимана-агама", content: [] },
		{ name: "Варуна-гата", content: [] },
		{ name: "Агнихотра-сутра", content: [] },
		{ name: "Золотая страна грез (пустыня)", content: [] },
		{ name: "Древний язык, новые знания (пустыня)", content: [] },
		{ name: "Панихида Билцис (пустыня Хадрамавет)", content: [] },
		{ name: "Ее враги бушуют словно волны (пустыня Хадрамавет)", content: [] },
		{ name: "Хварна добра и зла (Среди песков)", content: [] },
		{ name: "Монументальное исследование", content: [] },
		{ name: "Отдельные задания мира Сумеру", content: [] },
	],
	fontaine: [
		{ name: "Кисть морской пены и кармина", content: [] },
		{ name: "Градиент из снов и охры", content: [] },
		{ name: "Синяя тоска сердца и луны", content: [] },
		{ name: "Великое приключение в Нарциссенкрейце", content: [] },
		{ name: "Королевство в зеркале", content: [] },
		{ name: "Если она больше не мечтает о тебе…", content: [] },
		{ name: "Сцены жизни в крепости Меропид", content: [] },
		{ name: "Хроники Исследовательского института Фонтейна", content: [] },
		{ name: "Незавершенная комедия", content: [] },
		{ name: "Дикая фея Эриний", content: [] },
		{ name: "По следам Нарцисса", content: [] },
		{ name: "Опрос мелюзины и ответ машины", content: [] },
		{ name: "Оды Гармонии", content: [] },
		{ name: "Отдельные задания мира Фонтейна", content: [] },
	],
	chenyu: [
		{ name: "Нефритовое благословение", content: [] },
		{ name: "Отдельные задания мира долины Чэньюй", content: [] },
	],
};

const progressSlice = createSlice({
	name: "progress",
	initialState,
	reducers: {
		setProgress(_, action: PayloadAction<ProgressState>) {
			return action.payload;
		},
		setRegionProgress(
			state,
			action: PayloadAction<{ region: keyof ProgressState; id: number; subregion: string; force?: boolean }>
		) {
			const { region, id, subregion, force } = action.payload;

			const newState = state[region].map((subregionItem) => {
				if (subregionItem.name === subregion) {
					const toggle = (): number[] => {
						return subregionItem.content.includes(id)
							? subregionItem.content.filter((itemId) => itemId !== id)
							: [...subregionItem.content, id];
					};

					const update = (value: boolean): number[] => {
						if (value) {
							return [...subregionItem.content, id];
						} else {
							return subregionItem.content.filter((itemId) => itemId !== id);
						}
					};

					return {
						...subregionItem,
						content: force === undefined ? toggle() : update(force),
					};
				}

				return subregionItem;
			});

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
