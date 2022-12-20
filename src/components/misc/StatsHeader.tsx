import {
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Typography,
} from "@mui/material";
import useUser from "hooks/useUser";
import { get } from "lib/User";
import { FC, useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import { TransactionContext } from "../../context/TransactionContext";
import {
	getBalance,
	getMoneyToPayBack,
	getPendingMoney,
} from "../../lib/Statistics";
import LoadValue from "./LoadValue";

const StatsHeader: FC = () => {
	const [pendingMoney, setPendingMoney] = useState(0);
	const [toPay, setToPay] = useState(0);
	// const loading = useBoolean(true);
	const [loading, setLoading] = useState(true);
	const user = useUser();
	const { contacts } = useContext(ContactContext);
	const { transactions } = useContext(TransactionContext);

	useEffect(() => {
		setPendingMoney(getPendingMoney(contacts));
		setToPay(getMoneyToPayBack(contacts));

		setLoading(false);
	}, [contacts, transactions]);

	console.log(user);

	return (
		<Grid container spacing={1} p={1}>
			<Grid item xs={4}>
				<Card>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom
						>
							balance
						</Typography>
						<Typography variant="h5">
							<LoadValue value={user?.balance} />€
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={4}>
				<Card>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom
						>
							pending
						</Typography>
						<Typography variant="h5">
							<LoadValue value={pendingMoney} />€
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={4}>
				<Card>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom
						>
							to pay
						</Typography>
						<Typography variant="h5">
							<LoadValue value={toPay} />€
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default StatsHeader;
