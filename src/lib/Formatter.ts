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

export { formatMonthlyDate, formatDailyDate, formatDailyDateTime };
