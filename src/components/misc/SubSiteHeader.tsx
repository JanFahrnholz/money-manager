import { Box, Container, Grid, Paper } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import ReplayIcon from "@mui/icons-material/Replay";
interface Props {
    title: string;
    children: ReactNode;
}

const SubSiteHeader: FC<Props> = ({ children, title }) => {
    const { back, reload, push } = useRouter();
    const [loading, setLoading] = useState(false);

    const handleReload = () => {
        setLoading(true);
        reload();
    };

    const spinning = loading
        ? {
              animation: "spin 1s ease-in-out infinite",
              "@keyframes spin": {
                  "0%": {
                      transform: "rotate(360deg)",
                  },
                  "100%": {
                      transform: "rotate(0deg)",
                  },
              },
          }
        : {};

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                sx={{
                    backgroundColor: "secondary.main",
                    position: "fixed",
                    zIndex: 1500,
                    mt: 0,
                    p: 1.5,
                    pb: 0.75,
                }}
            >
                <Grid
                    xs={4}
                    item
                    sx={{ color: "primary.main" }}
                    onClick={() => push("/")}
                >
                    <HomeIcon />
                </Grid>
                <Grid xs={4} item sx={{ textAlign: "center" }}>
                    {title}
                </Grid>
                <Grid
                    xs={4}
                    item
                    sx={{ textAlign: "right", color: "primary.main" }}
                >
                    <ReplayIcon sx={spinning} onClick={() => handleReload()} />
                </Grid>
            </Grid>
            <Box sx={{ pb: 8 }} />
            <Container sx={{ p: 0 }}>{children}</Container>
        </>
    );
};

export default SubSiteHeader;
