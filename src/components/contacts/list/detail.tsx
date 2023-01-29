import DetailDrawer from "@/components/misc/DetailDrawer";
import LoadValue from "@/components/misc/LoadValue";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { calculateAverageAmountPerDay } from "lib/Statistics";
import { FC } from "react";
import useFetchContactDetails from "../../../hooks/useFetchContactDetails";
import { formatDailyDate } from "../../../lib/Formatter";
import { client } from "../../../lib/Pocketbase";
import LinkedFrom from "../../misc/LinkedFrom";
import ContactDetailsWhenOwned from "./isOwner";

interface Props {
	id: string | undefined;
	open: boolean;
	setOpen: (open: boolean) => void;
}

const ContactDetailDrawer: FC<Props> = ({ id, open, setOpen }) => {
	const { data, loading, error } = useFetchContactDetails(id);
	const isOwner = client.authStore.model?.id == data?.contact?.owner;

	const iOS =
		typeof navigator !== "undefined" &&
		/iPad|iPhone|iPod/.test(navigator.userAgent);

	const drawerHeight = 400;

	if (error !== undefined) <></>;
	if (loading || !data)
		return <LoadingDrawer open={open} setOpen={setOpen} />;

	const avgPerDay = () => {
		const avg = calculateAverageAmountPerDay(data.transactions);
		if (avg > 1000) return "<1000";
		return avg.toFixed(2);
	};

	return (
		<>
			<DetailDrawer open={open} setOpen={setOpen}>
				<Typography
					sx={{
						p: 2,
						color: "text.secondary",
						bgcolor: "background.paper",
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
					}}
				>
					{isOwner ? (
						<ContactDetailsWhenOwned
							contact={data.contact}
							setOpen={setOpen}
						/>
					) : (
						<LinkedFrom owner={data.contact.owner} />
					)}
				</Typography>

				<Typography
					sx={{
						p: 2,
						color: "text.secondary",
						bgcolor: "background.default",
					}}
				>
					<>
						Balance: {data.contact.balance}€
						{isOwner && <>, Cashflow: {data.cashflow}€</>}
						{isOwner && <>, €/day: {avgPerDay()}€</>}
					</>
				</Typography>

				{/* <StampcardProcessWidget contact={contact} /> */}

				<TableContainer sx={{ maxHeight: drawerHeight - 125 }}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>Amount</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Date</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.transactions.map((t, i) => (
								<TableRow key={i}>
									<TableCell>{t.amount}€</TableCell>
									<TableCell>{t.type}</TableCell>
									<TableCell>
										{formatDailyDate(t.date)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</DetailDrawer>

			{/* <TransactionDetailMenu
                transaction={currentTransaction}
                open={menuOpen}
                setOpen={setMenuOpen}
            /> */}
		</>
	);
};

export default ContactDetailDrawer;

const LoadingDrawer: FC<{
	open: boolean;
	setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
	return (
		<>
			<DetailDrawer open={open} setOpen={setOpen}>
				<LoadValue value={undefined} />
			</DetailDrawer>
		</>
	);
};
