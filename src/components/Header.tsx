import { FC } from "react";
import { NavLink } from "react-router-dom";
import Navbar, { NavbarItem } from "./Navbar";

const Header: FC = () => {
	const routes: NavbarItem[] = [
		{
			path: "/",
			text: "Главная",
		},
		{
			path: "/save",
			text: "Управление данными",
		},
	];

	return (
		<header className="header">
			<div className="header__container container">
				<NavLink to="/" className="header__logo">
					Genshin <span>Quest</span>
				</NavLink>
				<Navbar links={routes} />
			</div>
		</header>
	);
};

export default Header;
