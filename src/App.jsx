import React from "react";
import axios from "axios";
import { Layout, Input, Alert } from "antd";

import CardGrups from "./components/CardGrups/CardGrups.jsx";
import CategoryBtnColor from "./components/CategoryBtnColor.jsx";
import CategoryBtnPrivate from "./components/CategoryBtnPrivate.jsx";
import CategoryBtnFriends from "./components/CategoryBtnFriends.jsx";
import useDebounce from "./hooks/useDebounce.jsx";
import filterUsersByCategory from './utils/filterUsersByCategory.jsx'

import AppContext from "./context.jsx";
import "./sass/style.scss";

export default function App() {
	const { Header, Content } = Layout;

	const [items, setitems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [showAlert, setShowAlert] = React.useState(false);

	const [valueInput, setValueInput] = React.useState("");
	const [filterColorId, setFilterColorId] = React.useState("all");
	const [filterPrivate, setFilterPrivate] = React.useState("all");
	const [filterFriends, setFilterFriends] = React.useState("all");

	const debouncedValueInput = useDebounce(valueInput, 1000);
	const debouncedFilterColorId = useDebounce(filterColorId, 1000);
	const debouncedFilterPrivate = useDebounce(filterPrivate, 1000);
	const debouncedFilterFriends = useDebounce(filterFriends, 1000);

	const filteredUsers = filterUsersByCategory(items, debouncedFilterFriends);

	React.useEffect(() => {
		const fetchData = async () => {
      setIsLoading(true);
			setShowAlert(false);

			const colorId =
				debouncedFilterColorId !== "all" ? `avatar_color=${debouncedFilterColorId}` : "";
			const privateId =
				debouncedFilterPrivate !== "all"
					? `closed=${debouncedFilterPrivate}`
					: debouncedFilterPrivate === "all";

			await axios
				.get(
					`https://65ef356dead08fa78a501216.mockapi.io/VK?${privateId}&${colorId}&name=${debouncedValueInput}`,
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

		fetchData();
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
					<Input placeholder="Search" value={valueInput} onChange={(e) => setValueInput(e.target.value)} />;
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
						filteredUsers.map((item) => (
							<CardGrups
								{...item}
								key={item.id}
								circle={item.avatar_color}
								name={item.name}
								status={item.closed}
								subscribersCount={item.members_count}
								friends={item.friends}
							/>
						))
					) : (
						<div>"Change filters, element have not (:"</div>
					)}
				</Content>
			</Layout>
		</AppContext.Provider>
	);
}
