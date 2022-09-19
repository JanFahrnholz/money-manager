import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { TransactionContext } from "../../context/TransactionContext";

const StatsHeader: FC = () => {
    const ctx = useContext(ProfileContext);

    return (
        <Grid container>
            {ctx.stats.statistics.map((item, i) => {
                if (i >= 2) return;
                return (
                    <Grid item xs={6} key={item.name}>
                        <Card className="m-2">
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {item.name}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {item.value()}€
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default StatsHeader;
