import cron from "node-cron";

const task = cron.schedule("* * * * *", () => {
  console.log("Test")
})

export { task };