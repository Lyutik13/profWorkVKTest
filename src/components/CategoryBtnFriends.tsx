import React from "react";
import { Button } from "antd";

import AppContext from "../context.tsx";

export const CategoryBtnFriends: React.FC = () => {
	const { filterFriends, setFilterFriends } = React.useContext(AppContext);

	const categoryBtnFriends = ["all", "have friends", "not friends"];

	return (
		<ul className="categoryBtn">
			{categoryBtnFriends.map((categoriName, i) => (
				<li onClick={() => setFilterFriends(categoriName)} style={{ marginRight: "15px" }} key={i}>
					{filterFriends === categoryBtnFriends[i] ? (
						<Button type="primary">{categoriName}</Button>
					) : (
						<Button>{categoriName}</Button>
					)}
				</li>
			))}
		</ul>
	);
};

export default CategoryBtnFriends;

