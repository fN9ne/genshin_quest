const createDataJsonFile = (): string => {
	const data = {
		progress: [0, 1, 2],
	};

	const jsonData = JSON.stringify(data, null, 2);
	const blob = new Blob([jsonData], { type: "application/json" });

	return URL.createObjectURL(blob);
};

const downloadFile = (url: string, filename: string): void => {
	const link = document.createElement("a");

	link.href = url;
	link.download = filename;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const handleClick = () => {
	const url = createDataJsonFile();
	downloadFile(url, "data.json");
};

/*  */
/*  */
/*  */
/*  */
/*  */

const loadJSONFile = (url: string): Promise<any> => {
	return new Promise((resolve, reject) => {});
};

/* добавить отображение сколько всего квестов в регионе */
/* переключатель "скрыть выполненные" */
/* добавить админку для добавления квестов */
