import { Divider, List } from "@mui/material";
import { FC } from "react";
import UserUpdateField from "./update-field";

const UpdateUser: FC = () => {
    return (
        <>
            <div className="my-4">
                <Divider sx={{ color: "text.secondary" }}>
                    Your settings
                </Divider>
            </div>
            <List>
                <UserUpdateField
                    prop="enableTransactionsTab"
                    title="Activate transactions tab"
                    subTitle="allows you to create and view transactions"
                />
                <UserUpdateField
                    prop="enablePrivacyMode"
                    title="Activate privacy mode"
                    subTitle="allows you to hide sensitive information"
                />
                <UserUpdateField
                    prop="enableChats"
                    title="Activate chats"
                    subTitle="allows you to chat with your seller"
                />
                <UserUpdateField
                    prop="enableInsights"
                    title="Activate insights"
                    subTitle="e.g. total order count (work in progress)"
                    disabled
                />
            </List>
        </>
    );
};

export default UpdateUser;
