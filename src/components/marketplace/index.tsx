import LinkedProducts from "features/marketplace/components/linked-products";
import YourProducts from "features/marketplace/components/your-products";
import { FC } from "react";

const Marketplace: FC = () => {
    return (
        <div className="p-2">
            <YourProducts />
            <LinkedProducts />
        </div>
    );
};
export default Marketplace;
