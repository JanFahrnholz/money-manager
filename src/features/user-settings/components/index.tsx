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
                    title="Enable transactions tab"
                    subTitle="lets you create your own transactions"
                />
                <UserUpdateField
                    prop="enablePrivacyMode"
                    title="Enable privacy mode"
                    subTitle="allows you to hide sensitive information"
                />
                <UserUpdateField
                    prop="enableInsights"
                    title="Enable insights"
                    subTitle="e.g. total order count (work in progress)"
                    disabled
                />
            </List>
        </>
    );
};

export default UpdateUser;
