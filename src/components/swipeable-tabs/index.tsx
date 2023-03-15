import { FC, useState } from "react";
import { Box, Container, Tab as MuiTab, Tabs } from "@mui/material";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Virtual } from "swiper";
import "swiper/css/virtual";
import "swiper/css";
import Tab from "./tab";

interface SwipeableTabsProps {
    tabs: Tab[];
    startIndex?: number;
}

const SwipeableTabs: FC<SwipeableTabsProps> = ({ tabs, startIndex }) => {
    const [currentTab, setCurrentTab] = useState(tabs[startIndex ?? 0].id);
    const [swiper, setSwiper] = useState<any>();

    const handleChange = (id: number) => {
        setCurrentTab(id);
        swiper.slideTo(id);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", m: 0 }}>
                <Tabs value={currentTab} onChange={(e, id) => handleChange(id)}>
                    {tabs.map((tab) => (
                        <MuiTab
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
            <Swiper
                modules={[Virtual]}
                virtual
                onSwiper={setSwiper}
                onSlideChange={(swiper) =>
                    handleChange(tabs[swiper.activeIndex].id)
                }
            >
                {tabs.map((tab) => (
                    <SwiperSlide key={tab.id} virtualIndex={tab.id}>
                        <Container sx={{ p: 1, m: 0 }}>{tab.content}</Container>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SwipeableTabs;
