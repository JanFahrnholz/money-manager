import { FC, ReactNode, useEffect, useState } from "react";
import { Box, Container, Tab as MuiTab, Tabs } from "@mui/material";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Virtual } from "swiper";
import "swiper/css/virtual";
import "swiper/css";
import Slide from "./slide";
import ReactHook from "@/types/react-hook";
import SwipeableViewsDefaultTabs from "./default-tabs";

interface SwipeableViewsProps {
    slides: Slide[];
    startIndex?: number;
    onChange?: (activeIndex: number) => void;
    tabs?: (
        slides: Slide[],
        currentSlide: number,
        setCurrentSlide: ReactHook<number>
    ) => ReactNode;
}

const SwipeableViews: FC<SwipeableViewsProps> = ({
    slides,
    startIndex,
    onChange,
    tabs,
}) => {
    const [currentSlide, setCurrentSlide] = useState(
        slides[startIndex ?? 0].id
    );
    const [swiper, setSwiper] = useState<any>();

    const handleChange = (id: number) => {
        setCurrentSlide(id);
    };
    useEffect(() => {
        onChange ? onChange(currentSlide) : "";
        if (!swiper) return;
        swiper.slideTo(currentSlide);
    }, [currentSlide, onChange]);

    if (!tabs)
        tabs = (slides, currentSlide, setCurrentSlide) => (
            <SwipeableViewsDefaultTabs
                slides={slides}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
            />
        );
    return (
        <>
            {tabs(slides, currentSlide, setCurrentSlide)}

            <Swiper
                modules={[Virtual]}
                virtual
                onSwiper={setSwiper}
                onSlideChange={(swiper) =>
                    handleChange(slides[swiper.activeIndex].id)
                }
            >
                {slides.map((tab) => (
                    <SwiperSlide key={tab.id} virtualIndex={tab.id}>
                        <Container sx={{ p: 1, m: 0 }}>{tab.content}</Container>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SwipeableViews;
