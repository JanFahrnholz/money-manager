import { scheduleJob } from "node-schedule";
import { runAnalytics } from "./analytics";

const pending = scheduleJob("pending-statistics", "* * * * *", (date) => {});

runAnalytics(new Date());
console.log("Cronjobs started");
