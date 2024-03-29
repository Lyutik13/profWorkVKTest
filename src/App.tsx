import React from "react";
import axios from "axios";
import { Layout, Input, Alert } from "antd";

import CardGrups from "./components/CardGrups/CardGrups.tsx";
import CategoryBtnColor from "./components/CategoryBtnColor.tsx";
import CategoryBtnPrivate from "./components/CategoryBtnPrivate.tsx";
import CategoryBtnFriends from "./components/CategoryBtnFriends.tsx";
import useDebounce from "./hooks/useDebounce.tsx";
import filterUsersByCategory from "./utils/filterUsersByCategory.tsx";

import AppContext from "./context.tsx";
import { Group } from "./types.ts";

import "./sass/style.scss";

export default function App() {
	const { Header, Content } = Layout;

	const [items, setitems] = React.useState<Group[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [showAlert, setShowAlert] = React.useState<boolean>(false);

	const [valueInput, setValueInput] = React.useState<string>("");
	const [filterColorId, setFilterColorId] = React.useState<string>("all");
	const [filterPrivate, setFilterPrivate] = React.useState<string>("all");
	const [filterFriends, setFilterFriends] = React.useState<string>("all");

	const debouncedValueInput = useDebounce(valueInput, 1000);
	const debouncedFilterColorId = useDebounce(filterColorId, 1000);
	const debouncedFilterPrivate = useDebounce(filterPrivate, 1000);
	const debouncedFilterFriends = useDebounce(filterFriends, 1000);

	const filteredUsers = filterUsersByCategory(items, debouncedFilterFriends);

	const fetchData = async (color: string, group: string, valueInput: string) => {
		setIsLoading(true);
		setShowAlert(false);

		const colorId = color !== "all" ? `avatar_color=${color}` : "";
		const privateId = group !== "all" ? `closed=${group}` : group === "all";

		await axios
			.get(
				`https://65ef356dead08fa78a501216.mockapi.io/VK?${privateId}&${colorId}&name=${valueInput}`,
			)
			.then((res) => {
				setitems(res.data);
				setIsLoading(false);
			})
			.catch(function (err) {
				console.warn(err);
				// alert("Element filtering error, change filters");
				setShowAlert(true);
				setitems([]);
			});
	};

	React.useEffect(() => {
		fetchData(debouncedFilterColorId, debouncedFilterPrivate, debouncedValueInput);
	}, [debouncedFilterColorId, debouncedFilterPrivate, debouncedValueInput]);

	return (
		<AppContext.Provider
			value={{
				filterColorId,
				setFilterColorId,
				filterPrivate,
				setFilterPrivate,
				filterFriends,
				setFilterFriends,
				isLoading,
			}}>
			<Layout className="layoutStyle">
				<Header className="headerStyle">
					<Input
						placeholder="Search"
						value={valueInput}
						onChange={(e) => setValueInput(e.target.value)}
					/>
					;
				</Header>
				<CategoryBtnColor />
				<CategoryBtnPrivate />
				<CategoryBtnFriends />
				{showAlert && (
					<Alert
						message="Element filtering error, change filters"
						type="error"
						closable
						onClose={() => setShowAlert(false)}
					/>
				)}
				<Content className="contentStyle">
					{filteredUsers.length >= 1 ? (
						filteredUsers.map((item: Group) => <CardGrups {...item} key={item.id} />)
					) : (
						<div>"Change filters, element have not (:"</div>
					)}
				</Content>
			</Layout>
		</AppContext.Provider>
	);
}
