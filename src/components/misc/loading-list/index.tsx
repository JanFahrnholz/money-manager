import TransactionListItem from "@/components/transactions/list/item";
import TransactionDetailMenu from "@/components/transactions/menu";
import TransactionRecord from "@/types/TransactionRecord";
import { Box, Button, Divider, Typography } from "@mui/material";
import { formatDailyDate, formatMonthlyDate } from "lib/Formatter";
import { client } from "lib/Pocketbase";
import { useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import RenderInterval from "../RenderInterval";

const TransactionLoadingList = () => {
    const [menuTransaction, setMenuTransaction] = useState<
        TransactionRecord | undefined
    >();
    const [openActions, setOpenActions] = useState(false);
    const [data, setData] = useState<TransactionRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [reloading, setReloading] = useState(false);
    const perPage = 10;
    const ref = useRef();

    useEffect(() => {
        fetchData();
    }, [page]);

    async function fetchData() {
        setIsLoading(true);
        try {
            !reloading && setData([]);
            !reloading && setPage(1);
            const response = await client
                .collection("transactions")
                .getList<TransactionRecord>(page, perPage, {
                    sort: "-date",
                    expand: "contact,owner",
                });
            setData((data) => [...data, ...response.items]);
            setIsLoading(false);
            setHasMore(response.page < response.totalPages);
        } catch (err) {
            setIsLoading(false);
        }
    }

    const loadMoreRows = () => {
        if (hasMore) setPage(page + 1);
    };

    const reload = async () => {
        setReloading(true);
        await fetchData();
        setReloading(false);
    };

    const handleClick = (transaction: TransactionRecord) => {
        setMenuTransaction(transaction);
        setOpenActions(true);
    };

    return (
        <div className="px-2">
            <Button onClick={reload}>reload</Button>
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
                        <TransactionListItem
                            transaction={data[index]}
                            onClick={() => handleClick(data[index])}
                        />
                    </>
                )}
            />
            <TransactionDetailMenu
                transaction={menuTransaction}
                open={openActions}
                setOpen={setOpenActions}
            />
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
