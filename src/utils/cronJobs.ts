import cron from "node-cron";
import { updateStatistics } from "./populateDB";

const cronTask = cron.schedule("0 * * * *", () => {
  updateStatistics();
})

export { cronTask };