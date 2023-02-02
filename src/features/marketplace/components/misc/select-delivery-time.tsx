import { Select, MenuItem } from "@mui/material";
import { FC, useEffect } from "react";
interface Props {
    time: string;
    setTime: Function;
    initial?: string;
    fullWidth?: boolean;
}
const SelectDeliveryTime: FC<Props> = ({
    time,
    setTime,
    initial,
    fullWidth,
}) => {
    const openingHours = generateDatetimeList();
    useEffect(() => {
        setTime(initial ? initial : openingHours[0]);
    }, []);

    return (
        <>
            <Select
                fullWidth={fullWidth}
                value={time}
                onChange={(e) => setTime(e.target.value)}
            >
                {openingHours.map((time) => (
                    <MenuItem key={time} value={time}>
                        {time}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

const generateDatetimeList = (startTime = "14:00", endTime = "20:00") => {
    const interval = 30;

    const startDate = new Date(`1970-01-01T${startTime}:00`);
    const endDate = new Date(`1970-01-01T${endTime}:00`);

    const range = [];
    let currentDate = startDate;

    while (currentDate <= endDate && currentDate >= startDate) {
        range.push(currentDate.toTimeString().slice(0, 5));
        currentDate.setMinutes(currentDate.getMinutes() + interval);
    }
    return range;
};
export default SelectDeliveryTime;
