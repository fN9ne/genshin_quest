import { FC } from "react";
import { NavLink } from "react-router-dom";

export interface NavbarItem {
	path?: `/${string}`;
	text: string;
	onClick?: () => void;
}

interface NavbarProps {
	links: NavbarItem[];
}

const Navbar: FC<NavbarProps> = ({ links }) => {
	return (
		<nav className="navbar">
			<ul className="navbar__list">
				{links.map((link, index) => (
					<li className="navbar__item" key={index}>
						{!link.onClick && link.path ? (
							<NavLink to={link.path} className="navbar__link">
								{link.text}
							</NavLink>
						) : (
							<div onClick={link.onClick} className="navbar__link">
								{link.text}
							</div>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
