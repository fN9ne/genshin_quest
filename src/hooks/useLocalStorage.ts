import { useEffect } from "react";

const useLocalStorage = (keyName: string, action: (data: any) => any) => {
	useEffect(() => {
		const storedData = localStorage.getItem(keyName);

		if (storedData) {
			try {
				const parsedData = JSON.parse(storedData);
				action(parsedData);
			} catch (error) {
				console.error("Error parsing data from localStorage: ", error);
			}
		}
	}, [keyName, action]);
};

export default useLocalStorage;
