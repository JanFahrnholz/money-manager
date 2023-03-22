import useProfile from "features/user-profiles/hooks/useProfile";
import { FC } from "react";
import { formatDailyDateTime } from "../../lib/Formatter";
import { client } from "../../lib/Pocketbase";
import { remove } from "../../lib/Transactions";
import Record from "../../types/Record";
import Transaction from "../../types/Transaction";
import ActionMenu from "../misc/ActionMenu";

type Props = {
    transaction: Record<Transaction> | undefined;
    open: boolean;
    setOpen: (value: boolean) => void;
};

const TransactionDetailMenu: FC<Props> = ({ transaction, open, setOpen }) => {
    const profile = useProfile(transaction ? transaction.owner : null);
    if (!transaction) return <></>;

    const isOwner = client.authStore.model?.id == transaction.owner;

    const actions = [
        {
            name: formatDailyDateTime(transaction.date),
            action: undefined as undefined | Function,
            color: undefined as undefined | string,
        },
    ];

    if (transaction.info)
        actions.push({
            name: `Info: ${transaction.info}`,
            action: undefined,
            color: undefined,
        });

    if (!isOwner)
        actions.push({
            name: `Linked from ${profile?.username || transaction.owner}`,
            action: undefined,
            color: undefined,
        });

    if (isOwner)
        actions.push({
            name: "Delete",
            action: () => remove(transaction),
            color: "#ff1c1c",
        });
    return (
        <>
            <ActionMenu actions={actions} open={open} setOpen={setOpen} />
        </>
    );
};

export default TransactionDetailMenu;
