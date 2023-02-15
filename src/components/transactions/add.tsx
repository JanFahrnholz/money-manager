import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
	Checkbox,
	DialogContent,
	Fab,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import { FC, forwardRef, ReactElement, Ref, useContext, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import useLoggedIn from "../../hooks/useLoggedIn";
import { create as createRegular } from "../../lib/Transactions";
import { create as createPlanned } from "../../lib/PlannedTransactions";
import TransactionType from "../../types/TransactionType";
import Numpad from "../misc/numpad";
import Transaction from "@/types/Transaction";
import { client } from "lib/Pocketbase";

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement;
	},
	ref: Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AddTransaction: FC = () => {
	const [open, setOpen] = useState(false);
	const [planned, setPlanned] = useState(false);
	const [amount, setAmount] = useState<number>(0);
	const [contact, setContact] = useState<string>("");
	const [info, setInfo] = useState<string | undefined>();
	const [type, setType] = useState<TransactionType>("Einnahme");
	const { contacts } = useContext(ContactContext);
	const id = client.authStore.model?.id;
	const yourContacts = contacts.filter((contact) => contact.owner === id);
	const loggedIn = useLoggedIn();

	if (!loggedIn) return <></>;

	const types = ["Einnahme", "Ausgabe", "Rechnung", "Rückzahlung"];

	const submit = () => {
		const data: Pick<Transaction, "amount" | "info" | "type" | "contact"> =
			{
				amount,
				info: info || "",
				type,
				contact,
			};

		const p = planned ? createPlanned(data) : createRegular(data);

		p.then(() => {
			setInfo(undefined);
			setOpen(false);
		});
	};

	const getContact = (id: string) => contacts.find((c) => c.id === id);

	return (
		<div>
			<Fab
				variant="extended"
				size="medium"
				color="primary"
				aria-label="add"
				style={{
					margin: 0,
					top: "auto",
					right: 15,
					bottom: 90,
					left: "auto",
					position: "fixed",
					zIndex: 50,
				}}
				onClick={() => setOpen(true)}
			>
				<AddIcon sx={{ mr: 1 }} />
				New Transaction
			</Fab>

			<Dialog
				fullScreen
				open={open}
				onClose={() => setOpen(false)}
				TransitionComponent={Transition}
			>
				<AppBar
					sx={{
						position: "relative",
						px: 1,
						bgcolor: "primary.main",
						color: "primary.contrastText",
					}}
				>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={() => setOpen(false)}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography
							sx={{ ml: 2, flex: 1 }}
							variant="h6"
							component="div"
						>
							New Transaction
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={() => submit()}
						>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<DialogContent sx={{ bgcolor: "background.default" }}>
					<Typography
						variant="h2"
						sx={{
							textAlign: "center",
							my: 3.5,
							fontWeight: "500",
							letterSpacing: 1.5,
						}}
					>
						{amount.toFixed(2)}€
					</Typography>

					<Grid container columnSpacing={1}>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Contact
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={contact}
									label="Contact"
									onChange={(e) => setContact(e.target.value)}
									required
									placeholder="Select a contact"
								>
									{yourContacts &&
										yourContacts.map((c) => (
											<MenuItem value={c.id} key={c.id}>
												{c.name}
											</MenuItem>
										))}
								</Select>
								{contact && (
									<FormHelperText>
										balance: {getContact(contact)?.balance}
									</FormHelperText>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Type
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={type}
									label="Age"
									onChange={(e) =>
										setType(
											e.target.value as TransactionType
										)
									}
									required
									placeholder="Select a transaction type"
								>
									{types.map((type) => (
										<MenuItem value={type} key={type}>
											{type}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container sx={{ mt: 1 }} columnSpacing={1}>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<TextField
									placeholder="Optional: Info"
									fullWidth
									type="text"
									onChange={(e) => setInfo(e.target.value)}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={6} onClick={() => setPlanned(!planned)}>
							<FormControl fullWidth sx={{ p: 1 }}>
								<FormControlLabel
									control={<Checkbox checked={planned} />}
									label={"planned"}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<div className="mt-2">
						<Numpad setter={setAmount} />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddTransaction;
