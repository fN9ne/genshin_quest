import { FC, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navbar, { NavbarItem } from "./Navbar";
import Switcher from "./UI/Switcher";
import { useAppSelector } from "../hooks/useAppSelector";
import { useActions } from "../hooks/useActions";

const Header: FC = () => {
	const [isBurgerMenuActive, setIsBurgerMenuActive] = useState<boolean>(false);

	const { setModal } = useActions();

	const routes: NavbarItem[] = [
		{
			path: "/",
			text: "Главная",
		},
		{
			path: "/save",
			text: "Управление данными",
		},
		{
			text: "Обновления",
			onClick: () => {
				setIsBurgerMenuActive(false);
				setModal({ state: "isPatchNoteActive", value: true });
			},
		},
	];

	const location = useLocation();

	return (
		<>
			<header className="header">
				<div className="header__container container">
					<div>
						<NavLink to="/" className="header__logo">
							Genshin <span>Quest</span>
						</NavLink>
						{location.pathname === "/" && <Switchers />}
					</div>
					<Navbar links={routes} />
					<div
						className={`header-burger-menu${isBurgerMenuActive ? " active" : ""}`}
						onClick={() => setIsBurgerMenuActive(!isBurgerMenuActive)}
					>
						<span></span>
					</div>
				</div>
			</header>
			<div className={`header-burger-content${isBurgerMenuActive ? " active" : ""}`}>
				<div className="header-burger-content__area" onClick={() => setIsBurgerMenuActive(false)}></div>
				<div className="header-burger-content__body">
					<div className="header-burger-content__wrapper">
						<div className="easter-egg">автор игры: Владимир Хиль</div>
						<div className="header-burger-content__close" onClick={() => setIsBurgerMenuActive(false)}></div>
						<Navbar links={routes} />
						<div className="header-burger-content__switchers">{location.pathname === "/" && <Switchers />}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;

const Switchers: FC = () => {
	const { isHideCompleted, isInCompleteFirst, isInProgressFirst } = useAppSelector((state) => state.global);
	const { toggleIsHideCompleted, toggleIsInCompleteFirst, toggleIsInProgressFirst } = useActions();

	return (
		<>
			<Switcher
				text="Скрыть выполненные"
				checked={isHideCompleted}
				onClick={() => {
					if (isInCompleteFirst) {
						toggleIsInCompleteFirst(false);
					}

					toggleIsHideCompleted(!isHideCompleted);
				}}
			/>
			<Switcher
				text="Сначала не выполненные"
				checked={isInCompleteFirst}
				onClick={() => {
					if (isHideCompleted || isInProgressFirst) {
						toggleIsHideCompleted(false);
						toggleIsInProgressFirst(false);
					}

					toggleIsInCompleteFirst(!isInCompleteFirst);
				}}
			/>
			<Switcher
				text="Сначала в процессе"
				checked={isInProgressFirst}
				onClick={() => {
					if (isInCompleteFirst) {
						toggleIsInCompleteFirst(false);
					}

					toggleIsInProgressFirst(!isInProgressFirst);
				}}
			/>
		</>
	);
};
