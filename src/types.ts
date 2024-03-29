export interface GetGroupsResponse {
	result: 1 | 0;
	data?: Group[];
}

export interface Group {
	id: number;
	name: string;
	closed: boolean | string;
	members_count: number;
	avatar_color?: string | undefined;
	friends?: User[] | undefined;
}

export interface User {
	first_name: string;
	last_name: string;
}
