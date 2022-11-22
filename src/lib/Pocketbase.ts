import PocketBase from "pocketbase";

const client = new PocketBase(process.env.PB_URL);

const register = (password: string, passwordConfirm: string) => {
    return new Promise<any>(async (resolve, reject) => {
        const email = `mm-${new Date().valueOf()}@industed.com`;

        try {
            await client.users.create({
                email,
                password,
                passwordConfirm,
            });

            const { user } = await client.users.authViaEmail(email, password);

            await client.records.create("ids", {
                user_id: user.id,
                user_email: email,
            });

            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

const loginWithId = (id: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [{ user_email }] = await client.records.getFullList(
                "ids",
                undefined,
                {
                    user_id: id,
                }
            );

            const { user } = await client.users.authViaEmail(
                user_email,
                password
            );

            console.log(user);

            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

export { client, register, loginWithId };
