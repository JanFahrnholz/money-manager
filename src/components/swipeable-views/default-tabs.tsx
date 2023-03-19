import { Box, Tab, Tabs } from "@mui/material";
import { FC } from "react";
import Slide from "./slide";
import SwipeableTabsInterface from "./swipable-tabs-interface";

const SwipeableViewsDefaultTabs: FC<SwipeableTabsInterface> = ({
    slides,
    currentSlide,
    setCurrentSlide,
}) => {
    const handleChange = (id: number) => {
        if (!setCurrentSlide) return;
        setCurrentSlide(id);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", m: 0 }}>
                <Tabs
                    value={currentSlide}
                    onChange={(e, id) => handleChange(id)}
                >
                    {slides.map((tab) => (
                        <Tab
                            sx={{ minHeight: 0 }}
                            icon={tab.icon}
                            iconPosition={tab.iconPosition}
                            key={tab.id}
                            label={tab.title}
                            value={tab.id}
                        />
                    ))}
                </Tabs>
            </Box>
        </>
    );
};

export default SwipeableViewsDefaultTabs;
