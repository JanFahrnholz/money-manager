import { Divider } from "@mui/material";
import LinkedProducts from "features/marketplace/components/linked-products";
import UserHelp from "@/components/misc/user-help";
import YourProducts from "features/marketplace/components/your-products";
import { FC } from "react";
import MarketplaceUserHelp from "features/marketplace/components/misc/user-help";

const Marketplace: FC = () => {
    return (
        <div className="p-2">
            <YourProducts />
            <LinkedProducts />
            <MarketplaceUserHelp />
        </div>
    );
};
export default Marketplace;
