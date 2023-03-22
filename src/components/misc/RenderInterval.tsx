import { FC, ReactElement } from "react";
import Transaction from "../../types/Transaction";

type Props = {
    daily?: (date: Date) => ReactElement;
    monthly?: (date: Date) => ReactElement;
    yearly?: (date: Date) => ReactElement;
    array: any[];
    index: number;
    dateIndex?: string;
};

const RenderInterval: FC<Props> = ({
    daily,
    monthly,
    yearly,
    array,
    index,
    dateIndex,
}) => {
    if (!daily && !monthly && !yearly) return <></>;

    const currDate = new Date(array[index][dateIndex || "date"]);

    let nextDate;

    if (array[index - 1]) {
        nextDate = new Date(array[index - 1][dateIndex || "date"]);
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
