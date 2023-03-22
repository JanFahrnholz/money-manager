import Contact from "@/types/Contact";
import {
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { OrderRecord } from "features/marketplace/types/Order";
import { ProductRecord } from "features/marketplace/types/Product";
import { FC } from "react";

interface Props {
    order: OrderRecord;
    horizontal?: boolean;
}

const OrderCardStatus: FC<Props> = ({ order, horizontal }) => {
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

    const getLabelColor = (step: number) => {
        const error = isDeclined || isCanceled;
        const active = step === activeStep;
        let color = "rgba(255,255,255,0.5)";
        switch (step) {
            case 1:
                if (active) color = "success.main";
                if (step < activeStep || error) color = "primary.main";
                break;
            case 2:
                if (error) color = "error.main";
                if (step < activeStep) color = "primary.main";
                if (active) color = "success.main";
                break;
            case 3:
                if (active) color = "success.main";
                if (step < activeStep) color = "primary.main";
                break;
            case 4:
                if (active) color = "success.main";
                if (step < activeStep) color = "primary.main";
                break;

            default:
                break;
        }
        return color;
    };

    return (
        <>
            <Stepper
                orientation={horizontal ? "horizontal" : "vertical"}
                sx={{ my: 1 }}
                activeStep={activeStep}
                alternativeLabel={horizontal}
                connector={
                    <StepConnector
                        sx={{
                            span: { minHeight: "7px" },
                        }}
                    />
                }
            >
                <Step>
                    <StepLabel
                        sx={{
                            "& .MuiSvgIcon-root": { color: getLabelColor(1) },
                        }}
                    >
                        open
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel
                        sx={{
                            "& .MuiSvgIcon-root": { color: getLabelColor(2) },
                        }}
                        error={isDeclined || isCanceled}
                    >
                        {step2}
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel
                        sx={{
                            "& .MuiSvgIcon-root": { color: getLabelColor(3) },
                        }}
                    >
                        packaged
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel
                        sx={{
                            "& .MuiSvgIcon-root": { color: getLabelColor(4) },
                        }}
                    >
                        delivered
                    </StepLabel>
                </Step>
            </Stepper>
        </>
    );
};

export default OrderCardStatus;
