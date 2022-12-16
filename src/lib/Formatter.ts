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

export { formatMonthlyDate, formatDailyDate };
