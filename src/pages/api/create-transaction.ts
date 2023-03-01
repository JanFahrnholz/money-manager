import Transaction from "@/types/Transaction";
import TransactionRecord from "@/types/TransactionRecord";
import { updateContactOnCreate } from "lib/Contacts";
import { client } from "lib/Pocketbase";
import { transactionToast } from "lib/Toast";
import { updateBalanceOnCreate } from "lib/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TransactionRecord>
) {
    try {
        await create({});
    } catch (error) {}
}

const create = ({
    amount,
    info,
    contact,
    type,
}: Pick<Transaction, "amount" | "info" | "type" | "contact">) => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const res = await client
                .collection("transactions")
                .create<TransactionRecord>({
                    amount,
                    type,
                    info,
                    contact,
                    date: new Date(),
                    owner: client.authStore.model?.id,
                });

            updateContactOnCreate(res);
            updateBalanceOnCreate(res);

            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

    transactionToast(promise, "CREATE");

    return promise;
};
