import UserHelp from "@/components/misc/user-help";
import { Paper, Divider, Typography } from "@mui/material";
import { FC } from "react";

const MarketplaceUserHelp: FC = () => {
    return (
        <UserHelp storageKey="help-marketplace">
            <Paper sx={{ p: 1 }} elevation={1}>
                <Divider sx={{ mb: 2 }}>The Marketplace</Divider>
                <Typography>
                    Here you will see all products from users that linked your
                    user ID in a contact.
                </Typography>
                <Typography>
                    Share your user ID with a seller, to start ordering
                </Typography>
                <br />
                <Typography>
                    In case you want to sell items, create a profile and
                    activate the seller option. After that you will be able to
                    create your own products.
                </Typography>
                <Typography>
                    As a seller the privacy mode will be enabled.
                </Typography>
                <Divider sx={{ my: 2 }}>Data privacy</Divider>
                <Typography>
                    There is no order history, products are only visible for
                    selected users and you always have the option to delete your
                    ID and all related information to it.
                </Typography>
            </Paper>
        </UserHelp>
    );
};

export default MarketplaceUserHelp;
