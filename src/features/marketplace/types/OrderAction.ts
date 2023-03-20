import { ReactElement } from "react";

export type OrderActionType =
    | "accept"
    | "decline"
    | "package"
    | "deliver"
    | "cancel"
    | "delete";

export type OrderAction = {
    label: string;
    active: boolean;
    action: Function;
    icon?: ReactElement;
};
