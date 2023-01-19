import TransactionListItem from "@/components/transactions/list/item";
import TransactionRecord from "@/types/TransactionRecord";
import { Box, Divider, ListSubheader, Typography } from "@mui/material";
import { formatMonthlyDate, formatDailyDate } from "lib/Formatter";
import { client } from "lib/Pocketbase";
import { useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import LoadValue from "../LoadValue";
import RenderInterval from "../RenderInterval";

const TransactionLoadingList = () => {
    const [data, setData] = useState<TransactionRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;
    const ref = useRef();

    useEffect(() => {
        fetchData();
    }, [page]);

    async function fetchData() {
        setIsLoading(true);
        try {
            const response = await client
                .collection("transactions")
                .getList<TransactionRecord>(page, perPage, {
                    sort: "-date",
                    expand: "contact,owner",
                });
            setData([...data, ...response.items]);
            setIsLoading(false);
            setHasMore(response.page < response.totalPages);
            setTotalPages(response.totalPages);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    const loadMoreRows = () => {
        if (hasMore) setPage(page + 1);
    };

    return (
        <div className="px-2">
            <Virtuoso
                style={{ height: "calc(80vh - 50px)", paddingBottom: "50px" }}
                data={data}
                endReached={() => loadMoreRows()}
                itemContent={(index) => (
                    <>
                        <RenderInterval
                            array={data}
                            index={index}
                            monthly={(date) =>
                                subHeader(formatMonthlyDate(date))
                            }
                            daily={(date) => dayDivider(date)}
                        />
                        <TransactionListItem transaction={data[index]} />
                    </>
                )}
            />
            {isLoading && <p>loading</p>}
        </div>
    );
};

export default TransactionLoadingList;

const subHeader = (text: string) => {
    return (
        <Box
            sx={{
                textAlign: "center",
                backgroundColor: "background.paper",
                zIndex: 1000,
                borderRadius: "5px",
                p: 1.5,
            }}
        >
            {text}
        </Box>
    );
};

const dayDivider = (date: Date) => (
    <Divider
        sx={{
            width: "75%",
            mx: "auto",
            mt: 1,
        }}
    >
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            {formatDailyDate(date)}
        </Typography>
    </Divider>
);
