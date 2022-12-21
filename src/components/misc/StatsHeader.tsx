import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import useUser from "hooks/useUser";
import { modifyBalance } from "lib/User";
import { FC, useContext, useMemo } from "react";
import { ContactContext } from "../../context/ContactContext";
import { TransactionContext } from "../../context/TransactionContext";
import { getMoneyToPayBack, getPendingMoney } from "../../lib/Statistics";
import LoadValue from "./LoadValue";

const StatsHeader: FC = () => {
	const { contacts } = useContext(ContactContext);
	const { transactions } = useContext(TransactionContext);

	const user = useUser();
	console.log(user);

	const pendingMoney = useMemo(() => getPendingMoney(contacts), [contacts]);
	const toPay = useMemo(() => getMoneyToPayBack(contacts), [contacts]);

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
