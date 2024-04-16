import { FC, useRef, useState } from "react";
import AnimatePage from "../components/UI/AnimatePage";
import Button, { ButtonType } from "../components/UI/Button";
import { useAppSelector } from "../hooks/useAppSelector";
import { IQuestsData } from "../types";
import { useActions } from "../hooks/useActions";
import { ProgressState } from "../redux/reducers/progressSlice";
import questsData from "../quests.json";
import { updateProgress } from "../App";

const quests: IQuestsData = questsData;

const Save: FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const { setProgress, setInProgress } = useActions();
	const progress = useAppSelector((state) => state.progress);
	const inProgress = useAppSelector((state) => state.inProgress);

	/* export */
	const handleExport = () => {
		const createDataJsonFile = (): string => {
			const data = {
				complete: progress,
				inProgress: inProgress,
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

		downloadFile(createDataJsonFile(), "GenshinQuestData.json");
	};

	/* import */
	const uploadFileRef = useRef<HTMLInputElement>(null);

	const calculateQuests = (quests: typeof progress | IQuestsData): number => {
		return Object.keys(quests)
			.map((region) => {
				return quests[region as keyof typeof progress].map((item) => item.content.length);
			})
			.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + curr), 0);
	};

	const questWord = (number: number) => {
		const endings = {
			"1": "квест",
			"2": "квеста",
			"3": "квеста",
			"4": "квеста",
		};

		const numberStr = number.toString();
		const lastDigit = numberStr.charAt(numberStr.length - 1);

		if (
			endings.hasOwnProperty(lastDigit) &&
			!(numberStr.endsWith("11") || numberStr.endsWith("12") || numberStr.endsWith("13") || numberStr.endsWith("14"))
		) {
			return endings[lastDigit as keyof typeof endings];
		} else {
			return "квестов";
		}
	};

	const validateData = (data: any): boolean => {
		if (Object.keys(data).includes("complete") || Object.keys(data).includes("inProgress")) return false;
		return true;
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target;
		const file = input.files?.[0];

		if (file) {
			const fileName = file.name;

			if (!fileName.endsWith(".json")) {
				setError("Выбранный файл не является JSON.");
				return;
			}

			setError(null);
			setSuccess(null);

			const reader = new FileReader();

			reader.onload = () => {
				const result = reader.result as string;

				try {
					const jsonData = JSON.parse(result);

					if (validateData(jsonData)) {
						const questsData = jsonData as ProgressState;

						const newProgress = updateProgress(questsData, quests);
						setProgress(newProgress);
						localStorage.setItem("progress", JSON.stringify(newProgress));

						setSuccess(`Успешно загружено ${calculateQuests(questsData)} ${questWord(calculateQuests(questsData))}.`);
					} else {
						const questsData = jsonData as {
							complete: ProgressState;
							inProgress: ProgressState;
						};

						const newProgress = updateProgress(questsData.complete, quests);
						const newInProgress = updateProgress(questsData.inProgress, quests);

						setProgress(newProgress);
						setInProgress(newInProgress);

						localStorage.setItem("progress", JSON.stringify(newProgress));
						localStorage.setItem("inProgress", JSON.stringify(newInProgress));

						const sum = calculateQuests(questsData.complete) + calculateQuests(questsData.inProgress);

						setSuccess(`Успешно загружено ${sum} ${questWord(sum)}.`);
					}
				} catch (error: any) {
					setError("Ошибка при чтении файла: " + error.message);
				}
			};

			reader.readAsText(file);
		} else {
			setError("Файл не выбран.");
		}
	};

	const handleImport = () => {
		const element = uploadFileRef.current as HTMLInputElement;
		element.click();
	};

	return (
		<AnimatePage className="save">
			<div className="save__container container">
				<div className="save__description">
					<div className="save__description-wrapper">
						<h2>Добро пожаловать на страницу "Управление данными"!</h2>
						<p>
							Здесь ты можешь сохранить свои заслуги перед миром или просто попробовать выжать максимум из тех данных, что у тебя
							есть. Помни, хранить прогресс - это лучше, чем терять его в недрах интернета. На моём сайте твои данные в
							безопасности, пока, конечно, я не решу устроить на них вечеринку!
						</p>
						<p>
							И еще важно отметить, что мой веб-ресурс не позволяет тебе загружать выполненные задания непосредственно из игры.
							Здесь ты можешь осуществлять манипуляции исключительно с данными, хранящимися на данном сайте.
						</p>
					</div>
				</div>
				<div className="save__actions">
					<div className="save__buttons">
						<div className="save-export">
							<Button type={ButtonType.primary} onClick={handleExport}>
								Скачать данные
							</Button>
						</div>
						<div className="save-import">
							<label>
								<input onChange={handleFileUpload} ref={uploadFileRef} type="file" accept=".json" />
								<Button type={ButtonType.primary} onClick={handleImport}>
									Загрузить данные
								</Button>
							</label>
						</div>
					</div>
					{error && <div className="save-import__error">{error}</div>}
					{success && <div className="save-import__success">{success}</div>}
				</div>
			</div>
		</AnimatePage>
	);
};

export default Save;
