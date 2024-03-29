import { Group } from "../types";

const filterUsersByCategory = (users: Group[], category: string) => {
	switch (category) {
		case "all":
			return users;
		case "have friends":
			return users.filter((user) => user.friends);
		case "not friends":
			return users.filter((user) => !user.friends);
		default:
			return users;
	}
};

export default filterUsersByCategory;
