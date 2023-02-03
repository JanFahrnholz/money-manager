import { Button, Divider, Paper, Typography } from "@mui/material";
import usePersistentState from "hooks/usePersistentStorage";
import { FC } from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const MarketplaceUserHelp: FC = () => {
    const [show, setShow] = usePersistentState("show_marketplace_help", true);

    const toggleButton = () => (
        <Button onClick={() => setShow(!show)}>Dismiss</Button>
    );

    const helperCard = () => (
        <Paper sx={{ p: 1 }} elevation={1}>
            <Divider sx={{ mb: 2 }}>The Marketplace</Divider>
            <Typography>
                Here you will see all products from users that linked your user
                ID in a contact.
            </Typography>
            <Typography>
                Share your user ID with a seller, to start ordering
            </Typography>
            <br />
            <Typography>
                In case you want to sell items, create a profile and activate
                the seller option. After that you will be able to create your
                own products.
            </Typography>
            <Typography>
                As a seller the transactions tab and privacy mode will be
                enabled.
            </Typography>
            <Divider sx={{ my: 2 }}>Data privacy</Divider>
            <Typography>
                There is no order history, products are only visible for
                selected users and you always have the option to delete your ID
                and all related information to it.
            </Typography>
        </Paper>
    );

    return (
        <>
            {show && helperCard()}
            <div className="text-center">
                <Button sx={{ my: 2 }} onClick={() => setShow(!show)}>
                    {show ? "Dismiss" : <HelpOutlineOutlinedIcon />}
                </Button>
            </div>
        </>
    );
};

export default MarketplaceUserHelp;
