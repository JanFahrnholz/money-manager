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
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { FC, useState } from "react";

interface Props {
    order: OrderRecord;
}

const IncomingOrderCardStatus: FC<Props> = ({ order }) => {
    const product = order.expand.product as ProductRecord;
    const contact = order.expand.contact as Contact;

    let activeStep = 0;
    const isDeclined = order.status === "declined";
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

        default:
            break;
    }

    return (
        <>
            <Stepper
                orientation="vertical"
                sx={{ mt: 1 }}
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
                    <StepLabel error={isDeclined}>
                        <Typography>
                            {isDeclined ? "declined" : "accepted"}
                        </Typography>
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

export default IncomingOrderCardStatus;
