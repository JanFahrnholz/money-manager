import PocketBase from "pocketbase";

const client = new PocketBase(
    process.env.NODE_ENV === "production"
        ? "https://pb.industed.com/"
        : "https://pb-staging.industed.com/"
);

const email =
    process.env.NODE_ENV === "production"
        ? process.env.PB_PROD_EMAIL
        : process.env.PB_DEV_EMAIL;

const password =
    process.env.NODE_ENV === "production"
        ? process.env.PB_PROD_PASSWORD
        : process.env.PB_DEV_PASSWORD;

await client.admins.authWithPassword(email || "", password || "");

const getAnalyticsUser = async () => {
    const user = await client.collection("users").getFullList();

    return user.filter((user: any) => user.settings.analytics);
};

export { client, getAnalyticsUser };
