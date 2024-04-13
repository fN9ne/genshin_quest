import { FC } from "react";
import CheckIcon from "../../img/icons/check.svg?react";

interface SwitcherProps {
	text: string;
	checked: boolean;
	onClick: () => void;
}

const Switcher: FC<SwitcherProps> = ({ text, checked, onClick }) => {
	return (
		<label className="switcher">
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
