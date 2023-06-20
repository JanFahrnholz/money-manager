import { getAnalyticsUser } from "./pocketbase";

const runAnalytics = async (date: Date) => {
    const users = await getAnalyticsUser();
    console.log("🚀 ~ file: analytics.ts:5 ~ runAnalytics ~ users:", users);
};

export { runAnalytics };
