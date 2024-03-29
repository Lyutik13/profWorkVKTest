import React from "react";

interface AppContextType {
	filterColorId: string;
	setFilterColorId: (filterColorId: string) => void;
	filterPrivate: string;
	setFilterPrivate: (filterColorId: string) => void;
	filterFriends: string;
	setFilterFriends: (filterColorId: string) => void;
	isLoading: boolean;
}

const AppContext = React.createContext<AppContextType>({
	filterColorId: "all",
	setFilterColorId: () => {},
	filterPrivate: "all",
	setFilterPrivate: () => {},
	filterFriends: "all",
	setFilterFriends: () => {},
	isLoading: true,
});

export default AppContext;
