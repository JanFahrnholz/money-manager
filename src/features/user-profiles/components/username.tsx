import { Chip, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { ContactContext } from "context/ContactContext";
import useProfile from "features/user-profiles/hooks/useProfile";
import { FC, Fragment, useContext, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import useCopyToClipboard from "hooks/useCopyToClipboard";

type Props = {
    id: string;
    disableId?: boolean;
};

const Username: FC<Props> = ({ id, disableId }) => {
    const profile = useProfile(id);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { getContactByUserId } = useContext(ContactContext);
    const [text, copy] = useCopyToClipboard();

    let display = profile === undefined ? id : profile.username;

    const contact = getContactByUserId(id);

    if (contact) display = contact.name;

    const handleClick = (event: any) => {
        setOpen(!open);
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <span onClick={handleClick}>
                <Chip icon={<InfoIcon />} label={display} size="small" />
            </span>
            <Menu
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorEl}
                sx={{ mt: 1 }}
            >
                <MenuList dense sx={{ p: 0 }}>
                    <MenuItem onClick={() => copy(id)}>ID: {id}</MenuItem>
                    {profile && contact && (
                        <MenuItem>Username: {profile.username}</MenuItem>
                    )}
                </MenuList>
            </Menu>
        </>
    );
};

export default Username;
