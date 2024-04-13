import { FC } from "react";
import ModalLayout from "./ModalLayout";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";
import patch from "../../patch.json";

const PatchModal: FC = () => {
	const { isPatchNoteActive } = useAppSelector((state) => state.modal);
	const { setModal } = useActions();

	return (
		<ModalLayout
			isActive={isPatchNoteActive}
			onClose={() => setModal({ state: "isPatchNoteActive", value: false })}
			className="patch"
		>
			<div className="patch__header">
				<h2 className="patch__title">Обновление {import.meta.env.VITE_APP_VERSION}</h2>
				<div className="modal__close" onClick={() => setModal({ state: "isPatchNoteActive", value: false })}></div>
			</div>
			<div className="patch__body">
				<ul className="patch__list">
					{patch[import.meta.env.VITE_APP_VERSION as keyof typeof patch].map((text, index) => (
						<li key={index}>{text}</li>
					))}
				</ul>
			</div>
		</ModalLayout>
	);
};

export default PatchModal;
