import { Box, Grid, Paper } from "@mui/material";
import { FC, ReactNode } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useRouter } from "next/router";
interface Props {
    title: string;
    children: ReactNode;
}

const SubSiteHeader: FC<Props> = ({ children, title }) => {
    const { back } = useRouter();
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
                    onClick={() => back()}
                >
                    <NavigateBeforeIcon />
                </Grid>
                <Grid xs={4} item sx={{ textAlign: "center" }}>
                    {title}
                </Grid>
                <Grid xs={4} item sx={{ textAlign: "right" }}></Grid>
            </Grid>

            <Box sx={{ p: 1 }}>
                <Box sx={{ mb: 7 }} /> {children}
            </Box>
        </>
    );
};

export default SubSiteHeader;
