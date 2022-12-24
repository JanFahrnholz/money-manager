import Record from "./Record";

type User = Record<{
	username: string;
	verified: boolean;
	emailVisibility: boolean;
	email: string;
	balance: number;
}>;

export default User;
