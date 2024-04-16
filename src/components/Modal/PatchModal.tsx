import { FC } from "react";
import ModalLayout from "./ModalLayout";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";
import patch from "../../patch.json";

import StarIcon from "../../img/icons/star.svg?react";

const PatchModal: FC = () => {
	const { isPatchNoteActive } = useAppSelector((state) => state.modal);
	const { setModal } = useActions();

	return (
		<ModalLayout
			isActive={isPatchNoteActive}
			onClose={() => setModal({ state: "isPatchNoteActive", value: false })}
			className="patch"
		>
			<div className="modal__close" onClick={() => setModal({ state: "isPatchNoteActive", value: false })}></div>
			<div className="patch__content">
				{Object.keys(patch)
					.reverse()
					.map((version, index) => (
						<div className="patch__version" key={index}>
							<div className="patch__header">
								<h2 className="patch__title">Обновление {version}</h2>
								{index === 0 && (
									<div className="patch__label">
										<span>Новое</span>
										<StarIcon className="star star-1" />
										<StarIcon className="star star-2" />
										<StarIcon className="star star-3" />
									</div>
								)}
							</div>
							<div className="patch__body">
								<ul className="patch__list">
									{patch[version as keyof typeof patch].map((text, index) => (
										<li key={index}>{text}</li>
									))}
								</ul>
							</div>
						</div>
					))}
			</div>
		</ModalLayout>
	);
};

export default PatchModal;
