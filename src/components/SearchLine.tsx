import { FC } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useActions } from "../hooks/useActions";

import SearchIcon from "../img/icons/search.svg?react";

const SearchLine: FC = () => {
	const { searchQuery } = useAppSelector((state) => state.global);
	const { setSearchQuery } = useActions();

	return (
		<div className="search-line">
			<div className="search-line__input-wrapper">
				<div className="search-line__icon">
					<SearchIcon />
				</div>
				<input
					type="text"
					placeholder=" Поиск"
					value={searchQuery}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
				/>
			</div>
		</div>
	);
};

export default SearchLine;
