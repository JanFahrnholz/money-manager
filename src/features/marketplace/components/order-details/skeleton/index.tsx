import SwipeableViews from "@/components/swipeable-views";
import Slide from "@/components/swipeable-views/slide";
import LockIcon from "@mui/icons-material/Lock";
import { Container, Divider, Skeleton, Typography } from "@mui/material";
import useSetting from "features/user-settings/hooks/useSetting";
import { FC } from "react";

interface OrderDetailsSkeletonProps {}

const OrderDetailsSkeleton: FC<OrderDetailsSkeletonProps> = () => {
    const chatsEnabled = useSetting("chatsEnabled");

    const slides: Slide[] = [
        {
            id: 0,
            title: "Details",
            content: tabContentSkeleton(),
        },
        {
            id: 1,
            title: "Chat",
            icon: chatsEnabled ? undefined : <LockIcon sx={{ m: 0, p: 0 }} />,
            iconPosition: "end",
            content: <></>,
        },
    ];

    return (
        <Container>
            <Skeleton
                variant="rectangular"
                height={60}
                sx={{ mb: 1, borderRadius: 1 }}
            />
            <SwipeableViews slides={slides} />
        </Container>
    );
};

export default OrderDetailsSkeleton;
const tabContentSkeleton = () => (
    <>
        <div className="text-white">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <h1 className="text-base font-medium text-primary">
                    <Skeleton variant="text" animation="wave" />
                </h1>
                <Divider></Divider>
                <div className="mt-2">
                    <div className="flex space-x-6 py-2">
                        <div className="h-20 w-20 flex-none justify-center align-middle rounded-lg object-cover object-center ">
                            <Skeleton
                                variant="rectangular"
                                width={80}
                                height={80}
                                sx={{ borderRadius: 1 }}
                            />
                        </div>
                        <div className="flex flex-auto flex-col">
                            <div>
                                <h4 className="font-medium my-1">
                                    <Skeleton variant="text" animation="wave" />
                                </h4>
                                <p className="text-sm my-0">
                                    <Skeleton variant="text" animation="wave" />
                                </p>
                            </div>
                            <div className=" flex flex-1 items-end">
                                <dl className="flex  divide-x ">
                                    <div className="flex">
                                        <Skeleton
                                            variant="rectangular"
                                            sx={{ borderRadius: 1 }}
                                            width={60}
                                        />
                                    </div>
                                    <div className="flex pl-4 sm:pl-6">
                                        <Skeleton
                                            variant="rectangular"
                                            sx={{ borderRadius: 1 }}
                                            width={60}
                                        />
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <Divider />

                    <div className=" ">
                        <dl className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <dt className="font-medium text-dark-500">
                                    Payment method
                                </dt>

                                <p>
                                    <Skeleton variant="text" animation="wave" />
                                </p>
                            </div>
                            <div>
                                <dt className="font-medium text-dark-500">
                                    Delivery
                                </dt>

                                <p>
                                    <Skeleton variant="text" animation="wave" />
                                </p>
                            </div>
                        </dl>
                        <Divider />
                        <dl className="space-y-6 text-sm">
                            <div className="flex justify-between">
                                <dt className="font-medium text-dark-500">
                                    Total
                                </dt>
                                <dd className="w-12">
                                    <Skeleton variant="text" animation="wave" />
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
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ float: "right", width: 120 }}
                    />
                </Typography>
            </div>
        </div>
    </>
);
