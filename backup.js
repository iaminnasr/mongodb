const fs = require("fs");
const _ = require("lodash");
const exec = require("child_process").exec;
const path = require("path");

exports.stringToDate = (dateString) => {
  return new Date(dateString);
};

exports.dbAutoBackUp = () => {
  let dateStart = new Date().getTime();
  console.log("start");
  if (Boolean(process.env.autoBackup) == true) {
    console.log("true", true);
    let date = new Date();
    let beforeDate, oldBackupDir, oldBackupPath;

    // Current date
    currentDate = this.stringToDate(date);
    let newBackupDir =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate();

    let newBackupPath =
      process.env.autoBackupPath + "mongodump-" + newBackupDir;
    if (!fs.existsSync(newBackupPath)) {
      fs.mkdirSync(newBackupPath);
    }
    console.log("newBackupPath", newBackupPath);
    if (process.env.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      beforeDate.setDate(beforeDate.getDate() - process.env.keepLastDaysBackup);
      oldBackupDir =
        beforeDate.getFullYear() +
        "-" +
        (beforeDate.getMonth() + 1) +
        "-" +
        beforeDate.getDate();
      oldBackupPath = process.env.autoBackupPath + "mongodump-" + oldBackupDir;
    }

    let cmd = `mongodump ${
      process.env.host ? `--host ${process.env.host}` : ""
    } ${process.env.port ? `--port ${process.env.port}` : ""} ${
      newBackupPath ? `--out ${newBackupPath}` : ""
    } ${process.env.database ? `--db ${process.env.database}` : ""} ${
      process.env.user ? `--username ${process.env.user}` : ""
    } ${process.env.pass ? `--password ${process.env.pass}` : ""} ${
      process.env.zip ? `--gzip` : ""
    }`;

    console.log("cmd1", cmd);

    exec(cmd, (error, stdout, stderr) => {
      console.log(`Waited : ${new Date().getTime()-dateStart}ms`);
    });
  }
};
