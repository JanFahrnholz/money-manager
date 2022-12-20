import { FormControl, InputLabel, List, MenuItem, Select } from "@mui/material";
import useSelect from "hooks/useSelect";
import { FC, useContext, useState } from "react";
import { ContactContext } from "../../../context/ContactContext";
import ContactDetailDrawer from "./detail";
import EmptyContactList from "./empty";
import ContactListItem from "./item";

const ContactList: FC = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [selectedContact, setSelectedContact] = useState<string>();
	const { value, select, options } = useSelect(["cashflow", "balance"]);
	const { contacts } = useContext(ContactContext);
	const [error, setError] = useState<false | string>(false);
	let i = 0;
	let sortedContacts = contacts;

	if (value == "balance") {
		sortedContacts = contacts.sort((a, b) => {
			return a.balance < b.balance ? 1 : 0;
		});
	}

	console.log(sortedContacts, value);

	if (contacts.length === 0) return <EmptyContactList />;

	function handleClick(c: string) {
		setSelectedContact(c);
		setOpenDrawer(!openDrawer);
	}

	return (
		<>
			<div>
				<FormControl sx={{ m: 1, minWidth: 80 }}>
					<InputLabel id="contact-sort-select-label">Sort</InputLabel>
					<Select
						labelId="contact-sort-select-label"
						id="contact-sort-select"
						value={value}
						onChange={(e) => select(e.target.value)}
						autoWidth
						label="Sort"
						size="small"
					>
						{options.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>

			<List sx={{ width: "100%", pb: 18 }}>
				{sortedContacts.map((c) => {
					i += 0.05;
					return (
						<div key={c.id} onClick={() => handleClick(c.id)}>
							<ContactListItem contact={c} delay={i} />
						</div>
					);
				})}
			</List>

			<ContactDetailDrawer
				id={selectedContact}
				open={openDrawer}
				setOpen={setOpenDrawer}
			/>
		</>
	);
};

export default ContactList;
