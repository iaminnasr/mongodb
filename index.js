const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


global.CronJob = require("./cron.js");



console.log("Backup Auto Runing...")