const CronJob = require("cron").CronJob;
const path = require("path");
const Backup = require("./backup.js");

// AutoBackUp every week (at 00:00 on Sunday)
const Cron = new CronJob(
  process.env.cron,
  function () {
    Backup.dbAutoBackUp();
  },
  null,
  true,
  "Asia/Tehran"
);
module.exports = Cron;
