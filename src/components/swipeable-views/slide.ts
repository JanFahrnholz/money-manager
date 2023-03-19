import { ReactElement, ReactNode } from "react";

type Slide = {
    id: number;
    title: string;
    icon?: ReactElement;
    iconPosition?: "top" | "start" | "end" | "bottom";
    content: ReactNode;
};

export default Slide;
