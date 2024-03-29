import React from "react";
import { Button } from "antd";

import AppContext from "../context.tsx";

export const CategoryBtnPrivate: React.FC = () => {
	const { filterPrivate, setFilterPrivate } = React.useContext(AppContext);

	const categoryBtnPrivate = [
		{ name: "all", sortProperty: "all" },
		{ name: "closed", sortProperty: "false" },
		{ name: "open", sortProperty: "true" },
	];

	return (
		<ul className="categoryBtn">
			{categoryBtnPrivate.map((categoriName, i) => (
				<li
					onClick={() => setFilterPrivate(categoriName.sortProperty)}
					style={{ marginRight: "15px" }}
					key={i}>
					{filterPrivate === categoriName.sortProperty ? (
						<Button type="primary">{categoriName.name}</Button>
					) : (
						<Button>{categoriName.name}</Button>
					)}
				</li>
			))}
		</ul>
	);
};

export default CategoryBtnPrivate;
