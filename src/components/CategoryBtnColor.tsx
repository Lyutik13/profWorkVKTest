import React from "react";
import { Button } from "antd";

import AppContext from "../context.tsx";

export const CategoryBtnColor: React.FC = () => {
  const {filterColorId, setFilterColorId} = React.useContext(AppContext)

	const categoryBtnColor = ["all", "red", "green", "yellow", "blue", "purple", "white", "orange"];

	return (
		<ul className="categoryBtn">
			{categoryBtnColor.map((categoriName, i) => (
				<li onClick={() => setFilterColorId(categoriName)} style={{ marginRight: "15px" }} key={i}>
					{filterColorId === categoryBtnColor[i] ? <Button type="primary">{categoriName}</Button> : <Button>{categoriName}</Button>}
				</li>
			))}
		</ul>
	);
};

export default CategoryBtnColor;
