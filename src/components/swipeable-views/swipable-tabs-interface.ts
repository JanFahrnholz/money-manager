import { ReactHook } from "@/types/react-hook";
import Slide from "./slide";

export default interface SwipeableTabsInterface {
    slides: Slide[];
    currentSlide: number;
    setCurrentSlide?: ReactHook<number>;
}
