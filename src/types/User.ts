import Record from "./Record";

type User = Record<{
    username: string;
    verified: boolean;
    emailVisibility: boolean;
    email: string;
    balance: number;
    enablePrivacyMode: boolean;
    enableTransactionsTab: boolean;
    enableChats: boolean;
    enableInsights: boolean;
    settings: {
        analytics: boolean;
    };
}>;

export default User;
