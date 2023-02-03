const formatMonthlyDate = (date: Date) =>
    `${new Date(date).toLocaleDateString("default", {
        month: "long",
        year: "numeric",
    })}`;

const formatDailyDate = (date: Date) =>
    `${new Date(date).toLocaleDateString("default", {
        day: "2-digit",
        month: "long",
    })}`;

const formatDailyDateTime = (date: Date) =>
    `${new Date(date).toLocaleDateString("default", {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    })}`;

const getDeliveryTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("de-DE", {
        minute: "2-digit",
        hour: "2-digit",
    });
};

const parseDeliveryDate = (date: Date | undefined) => {
    if (!date) return;
    date = new Date(date);
    const now = new Date();
    const time = date.toLocaleTimeString("de-De", {
        minute: "2-digit",
        hour: "2-digit",
    });
    if (date.toDateString() === now.toDateString()) {
        return `today ${time}`;
    }
    if (
        date.toDateString() ===
        new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString()
    ) {
        return `tomorrow ${time}`;
    }
    return date.toLocaleDateString("de-DE", {
        minute: "2-digit",
        hour: "2-digit",
    });
};

const getDeliveryDateObject = (inputDate: string, inputTime: string) => {
    const now = new Date();
    const [hours, minutes] = inputTime
        .split(":")
        .map((val) => parseInt(val, 10));

    const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        inputDate === "tomorrow" ? now.getDate() + 1 : now.getDate(),
        hours,
        minutes
    );
    return date;
};

const setDeliveryTime = (date: Date, time: string) => {
    date = new Date(date);
    const [hours, minutes] = time.split(":").map((val) => parseInt(val, 10));

    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
};

export {
    formatMonthlyDate,
    formatDailyDate,
    formatDailyDateTime,
    getDeliveryTime,
    parseDeliveryDate,
    getDeliveryDateObject,
    setDeliveryTime,
};
