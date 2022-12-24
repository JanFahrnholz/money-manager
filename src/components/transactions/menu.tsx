import { FC, useState } from "react";
import { remove } from "../../lib/Transactions";
import { client } from "../../lib/Pocketbase";
import Transaction from "../../types/Transaction";
import Record from "../../types/Record";
import ActionMenu from "../misc/ActionMenu";
import { formatDailyDate, formatDailyDateTime } from "../../lib/Formatter";

type Props = {
	transaction: Record<Transaction> | undefined;
	open: boolean;
	setOpen: (value: boolean) => void;
};

const TransactionDetailMenu: FC<Props> = ({ transaction, open, setOpen }) => {
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
			color: undefined as undefined | string,
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
