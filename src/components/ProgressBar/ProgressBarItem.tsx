import { FC } from "react";

export interface ProgressBarItemProps {
	icon: string;
	progress: number;
	name: string;
	background: string;
	isActive: boolean;
	onClick: () => void;
}

const colors: { progress: number; color: `#${string}` }[] = [
	{
		progress: 0,
		color: "#f1f1f1",
	},
	{
		progress: 12.5,
		color: "#f64d4d",
	},
	{
		progress: 25,
		color: "#f66c4d",
	},
	{
		progress: 37.5,
		color: "#f6a24d",
	},
	{
		progress: 50,
		color: "#f6c34d",
	},
	{
		progress: 62.5,
		color: "#f6ee4d",
	},
	{
		progress: 75,
		color: "#a7f64d",
	},
	{
		progress: 87.5,
		color: "#55f64d",
	},
	{
		progress: 100,
		color: "#75c2ce",
	},
];

const ProgressBarItem: FC<ProgressBarItemProps> = ({ icon, progress, name, background, isActive, onClick }) => {
	const currentColor = (progress: number): string => {
		const closestColor = colors.reduce((prev, curr) => {
			return Math.abs(curr.progress - progress) < Math.abs(prev.progress - progress) ? curr : prev;
		});

		return closestColor.color;
	};

	return (
		<div className={`progress-bar-item${isActive ? " active" : ""}`} onClick={onClick}>
			<div className="progress-bar-item__wrapper">
				<img src={icon} alt={name + " region icon"} className="progress-bar-item__icon" />
				<div className="progress-bar-item__content">
					<div className="progress-bar-item__name">{name}</div>
					<div className="progress-bar-item__progress">
						<div className="progress-bar-item__progress-text">
							<img src="/location.png" alt="progress icon" />
							<span>
								Прогресс выполнения: <b style={{ color: currentColor(progress) }}>{progress}%</b>
							</span>
						</div>
						<div className="progress-bar-item__progress-line">
							<div style={{ width: progress + "%", backgroundColor: currentColor(progress) }}></div>
						</div>
					</div>
				</div>
			</div>
			<div className="progress-bar-item__background">
				<div />
				<img src={background} alt={name + " region background"} />
			</div>
		</div>
	);
};

export default ProgressBarItem;
