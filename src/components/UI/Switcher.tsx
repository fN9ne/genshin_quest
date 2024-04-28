import { FC } from "react";
import CheckIcon from "../../img/icons/check.svg?react";

interface SwitcherProps {
	text: string;
	checked: boolean;
	disabled?: boolean;
	onClick: () => void;
}

const Switcher: FC<SwitcherProps> = ({ text, checked, disabled = false, onClick }) => {
	return (
		<label className={`switcher${disabled ? " switcher--disabled" : ""}`}>
			<input type="checkbox" checked={checked} onChange={onClick} />
			<div className="switcher__origin">
				<div>
					<CheckIcon />
				</div>
			</div>
			<div className="switcher__text">{text}</div>
		</label>
	);
};

export default Switcher;
