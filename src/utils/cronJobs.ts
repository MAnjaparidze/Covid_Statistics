import cron from "node-cron";
import { updateStatistics } from "./populateDB";

const cronTask = cron.schedule("* * * * *", () => {
  updateStatistics();
})

export { cronTask };