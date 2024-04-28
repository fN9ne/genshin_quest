import { FC, useState } from "react";
import ModalLayout from "./ModalLayout";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";

import StarIcon from "../../img/icons/star.svg?react";
import Button, { ButtonType } from "../UI/Button";

import { AnimatePresence as AP, motion as m } from "framer-motion";
import { OldProgressState, ProgressState } from "../../redux/reducers/progressSlice";
import { IQuestsData } from "../../types";
import questData from "../../quests.json";
import { InProgressState } from "../../redux/reducers/inProgress";

const quests: IQuestsData = questData;

const MigrationModal: FC = () => {
	const { isMigrationActive } = useAppSelector((state) => state.modal);
	const { setModal, setProgress, setInProgress, setNeedMigration } = useActions();

	const [isMigration, setIsMigration] = useState<boolean | null>(null);

	const progress = useAppSelector((state) => state.progress);
	const inProgress = useAppSelector((state) => state.inProgress);

	const [isAnnotation, setIsAnnotaion] = useState<boolean>(false);

	const migrate = (event: React.MouseEvent<HTMLButtonElement>) => {
		setTimeout(() => {
			const getMigratedProgress = (progress: OldProgressState): ProgressState => {
				const newProgress: ProgressState = {} as ProgressState;

				for (const region in progress) {
					if (Object.prototype.hasOwnProperty.call(progress, region)) {
						const regionQuests: number[] = [];
						let accumulatedQuestsLength = 0;

						for (const subRegion of progress[region as keyof ProgressState]) {
							regionQuests.push(...subRegion.content.map((questId) => accumulatedQuestsLength + questId));

							const subRegionMirror = quests[region as keyof IQuestsData].find((subReg) => subReg.name === subRegion.name);

							if (subRegionMirror) {
								accumulatedQuestsLength += subRegionMirror!.content.length;
							}
						}

						newProgress[region as keyof ProgressState] = regionQuests;
					}
				}

				return newProgress;
			};

			const newProgress: ProgressState = getMigratedProgress(progress as any);
			const newInProgress: InProgressState = getMigratedProgress(inProgress as any);

			setProgress(newProgress);
			setInProgress(newInProgress);

			localStorage.setItem("progress", JSON.stringify(newProgress));
			localStorage.setItem("inProgress", JSON.stringify(newInProgress));

			setModal({ state: "isMigrationActive", value: false });
			setNeedMigration(false);
		}, 2500);

		if (event.target) {
			if (event.currentTarget.querySelector("span.circle")) {
				event.currentTarget.querySelector("span.circle")!.remove();
			}

			const span = document.createElement("span");

			span.classList.add("circle");

			const parentElement = event.currentTarget.closest(".migration");

			const parentRect = parentElement?.getBoundingClientRect();

			if (parentRect) {
				const offsetX = event.clientX - parentRect.left;
				const offsetY = event.clientY - parentRect.top;

				span.style.left = offsetX + "px";
				span.style.top = offsetY + "px";
			}

			event.currentTarget.appendChild(span);

			setIsMigration(true);
		}
	};

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
		transition: { duration: 0.35 },
	};

	return (
		<ModalLayout
			isActive={isMigrationActive}
			onClose={() => setModal({ state: "isMigrationActive", value: false })}
			className="migration"
			easyClose={false}
		>
			<div className={`migration__content${isMigration ? " migration__content--animate" : ""}`}>
				<div className="patch__header">
					<h2 className="patch__title">
						Обновление <span className="num">1.3</span>, <span className="select">миграция!</span>
					</h2>
					<div className="patch__label">
						<span>Новое</span>
						<StarIcon className="star star-1" />
						<StarIcon className="star star-2" />
						<StarIcon className="star star-3" />
					</div>
				</div>
				<div className="migration__body">
					<div className={`migration__text${isAnnotation ? " migration__text--minified" : ""}`}>
						<p>
							Привет! Рад снова тебя видеть в нашей мастерской Genshin Quest. Слушай, у нас тут небольшие перемены. Наши
							исследователи приняли решение провести некоторые технические манипуляции. Не волнуйся, это не так страшно, как
							замена зубчатых колес в самом сердце устройства или ремонт трубопроводов под водой, у тюрьмы Меропид. Все, что нам
							нужно, сделать, это заменить старые детали новыми, придав механизмам свежий ветер перемен.
						</p>
						<p>
							Вываливай свои чертежи! Я приведу их в соответствие с новыми требованиями. Отказ не принимается, всё сообщество
							механиков, не позволит тебе использовать свои устаревшие наработки.
						</p>
					</div>
					<AP mode="wait" initial={false}>
						{isAnnotation && (
							<m.div key="2" {...transitions} className="migration__text">
								<p>Если опустить весь этот RolePlay, то:</p>
								<p>
									Были проведены некоторые работы над изменением структуры данных проекта, была переписана структура хранения
									прогресса, и так как она отличается от того, как до этого выполнялся процесс хранения выполненных заданий,
									необходимо провести преобразования старого формата данных в новый, чтобы всё работало.
								</p>
								<p>
									Было это сделано не с бухты-барахты, а по разумным причинам, чтобы при добавлении/изменении/удалении какого-то
									контента на данном веб-ресурсе, и я, и вы не столкнулись с проблемами, всем приятного пользования сервисом!
								</p>
							</m.div>
						)}
					</AP>
					<div className={`migration__complete${isMigration ? " migration__complete--active" : ""}`}>
						Миграция успешно завершена!
					</div>
				</div>
				<div className="migration__footer">
					<Button type={ButtonType.secondary} onClick={() => setIsAnnotaion((state) => !state)}>
						ЧаВо?
					</Button>
					<Button type={ButtonType.primary} onClick={migrate}>
						Мигрировать данные
					</Button>
				</div>
			</div>
		</ModalLayout>
	);
};

export default MigrationModal;
