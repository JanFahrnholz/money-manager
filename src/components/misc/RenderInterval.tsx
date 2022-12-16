import { FC, ReactElement } from "react";
import Transaction from "../../types/Transaction";

type Props<T> = {
    daily?: (date: Date) => ReactElement;
    monthly?: (date: Date) => ReactElement;
    yearly?: (date: Date) => ReactElement;
    array: any[];
    index: number;
};

const RenderInterval: FC<Props<Transaction>> = ({
    daily,
    monthly,
    yearly,
    array,
    index,
}) => {
    if (!daily && !monthly && !yearly) return <></>;

    const currDate = new Date(array[index]["date"]);

    let nextDate;

    if (array[index - 1]) {
        nextDate = new Date(array[index - 1]["date"]);
    }

    const renderYearly = currDate.getFullYear() != nextDate?.getFullYear();
    const renderMonthly = currDate.getMonth() != nextDate?.getMonth();
    const renderDaily = currDate.getDay() != nextDate?.getDay();

    return (
        <>
            {renderYearly && yearly != undefined && yearly(currDate)}
            {renderMonthly && monthly != undefined && monthly(currDate)}
            {renderDaily && daily != undefined && daily(currDate)}
        </>
    );
};

export default RenderInterval;
