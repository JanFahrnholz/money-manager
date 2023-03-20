import { Divider, Typography } from "@mui/material";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { FC } from "react";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { formatDailyDateTime } from "lib/Formatter";
import Username from "features/user-profiles/components/username";
import ReactTimeAgo from "react-time-ago";
import OrderActionsMenu from "../misc/order-actions-menu";
import { userId } from "lib/Pocketbase";
import Contact from "@/types/Contact";
interface OrderDetailsProps {
    order: OrderRecord;
}

const OrderDetailsTabContent: FC<OrderDetailsProps> = ({ order }) => {
    const product = order.product;
    const contact = order.expand.contact as Contact;
    const isOwner = order.product.owner === userId;

    return (
        <>
            <div className="text-white">
                <div className="mx-auto px-2 sm:px-6 lg:px-8">
                    <h1 className="text-base font-medium text-primary">
                        {isOwner ? (
                            <>
                                <Username id={contact.user} /> ordered something
                            </>
                        ) : (
                            <>
                                Thanks for your order at{" "}
                                <Username id={product.owner} />!
                            </>
                        )}
                    </h1>
                    <Divider></Divider>
                    <div className="mt-2">
                        <div className="flex space-x-6 py-2">
                            <div
                                // src={product.imageSrc}
                                // alt={product.imageAlt}
                                className="h-20 w-20 flex-none p-7 justify-center align-middle rounded-lg bg-gray-100 text-dark-500  object-cover object-center "
                            >
                                <ImageNotSupportedIcon />
                            </div>
                            <div className="flex flex-auto flex-col">
                                <div>
                                    <h4 className="font-medium my-1">
                                        {product.name}
                                    </h4>
                                    <p className="text-sm text-dark-500 my-0">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="mt-6 flex flex-1 items-end">
                                    <dl className="flex space-x-4 divide-x divide-dark-200 text-sm sm:space-x-6">
                                        <div className="flex">
                                            <dt className="font-medium text-dark-500">
                                                Price
                                            </dt>
                                            <dd className="ml-2">
                                                {product.price.toFixed(2)}€/
                                                {product.unit}
                                            </dd>
                                        </div>
                                        <div className="flex pl-4 sm:pl-6">
                                            <dt className="font-medium text-dark-500">
                                                Quantity
                                            </dt>
                                            <dd className="ml-2 ">
                                                {order.quantity.toFixed(2)}
                                                {product.unit}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div className=" ">
                            <dl className="grid grid-cols-2  text-sm">
                                <div>
                                    <dt className="font-medium text-dark-500">
                                        Payment method
                                    </dt>

                                    <p>Cash</p>
                                </div>
                                <div>
                                    <dt className="font-medium text-dark-500">
                                        Delivery
                                    </dt>

                                    <p>
                                        {formatDailyDateTime(
                                            new Date(order.when)
                                        )}
                                        {order.location &&
                                            `, ${order.location}`}
                                    </p>
                                </div>
                            </dl>
                            <Divider />
                            <dl className="space-y-6 text-sm">
                                {/* <div className="flex justify-between">
                                    <dt className="font-medium text-dark-500">
                                        Subtotal
                                    </dt>
                                    <dd>$36.00</dd>
                                </div> */}
                                {/* <div className="flex justify-between">
                                    <dt className="flex font-medium text-dark-500">
                                        Discount
                                        <span className="ml-2 rounded-full py-0.5 px-2 text-xs bg-dark-500 text-dark-900">
                                            STUDENT50
                                        </span>
                                    </dt>
                                    <dd className="">-$18.00 (50%)</dd>
                                </div> */}
                                {/* <div className="flex justify-between">
                                    <dt className="font-medium text-dark-500">
                                        Shipping
                                    </dt>
                                    <dd className="">$5.00</dd>
                                </div> */}
                                <div className="flex justify-between">
                                    <dt className="font-medium text-dark-500">
                                        Total
                                    </dt>
                                    <dd className="">
                                        {(
                                            order.quantity * product.price
                                        ).toFixed(2)}
                                        €
                                    </dd>
                                </div>
                            </dl>
                            <Divider />
                        </div>
                    </div>
                    <Typography
                        fontSize={"small"}
                        color="text.secondary"
                        textAlign={"right"}
                        mt={1}
                    >
                        updated{" "}
                        <ReactTimeAgo
                            date={new Date(order.updated)}
                            timeStyle="twitter"
                        />{" "}
                        ago
                    </Typography>
                    <OrderActionsMenu order={order} />
                </div>
            </div>
        </>
    );
};

export default OrderDetailsTabContent;
