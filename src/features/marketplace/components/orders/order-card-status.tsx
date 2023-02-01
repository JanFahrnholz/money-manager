import Contact from "@/types/Contact";
import { Check } from "@mui/icons-material";
import {
    Stepper,
    StepConnector,
    Step,
    StepLabel,
    styled,
    StepIconProps,
    Icon,
    StepIcon,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { FC, useState } from "react";

interface Props {
    order: OrderRecord;
}

const OrderCardStatus: FC<Props> = ({ order }) => {
    const product = order.expand.product as ProductRecord;
    const contact = order.expand.contact as Contact;

    let activeStep = 0;
    const isDeclined = order.status === "declined";
    const isCanceled = order.status === "canceled";
    switch (order.status) {
        case "open":
            activeStep = 1;
            break;

        case "accepted":
            activeStep = 2;
            break;

        case "declined":
            activeStep = 1;
            break;

        case "packaged":
            activeStep = 3;
            break;

        case "delivered":
            activeStep = 4;
            break;

        case "canceled":
            activeStep = 1;
            break;

        default:
            break;
    }

    let step2 = "accepted";
    if (isDeclined) step2 = "declined";
    if (isCanceled) step2 = "canceled";

    return (
        <>
            <Stepper
                orientation="vertical"
                sx={{ my: 1 }}
                activeStep={activeStep}
                connector={
                    <StepConnector
                        sx={{
                            span: { minHeight: "7px" },
                        }}
                    />
                }
            >
                <Step>
                    <StepLabel>open</StepLabel>
                </Step>
                <Step>
                    <StepLabel error={isDeclined || isCanceled}>
                        <Typography>{step2}</Typography>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>packaged</StepLabel>
                </Step>
                <Step>
                    <StepLabel>delivered</StepLabel>
                </Step>
            </Stepper>
        </>
    );
};

export default OrderCardStatus;
