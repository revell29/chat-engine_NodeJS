import chalk from "chalk";
const LOG_TYPES = {
  NONE: 0,
  ERROR: 1,
  NORMAL: 2,
  DEBUG: 3,
  FFDEBUG: 4,
};

let logType = LOG_TYPES.NORMAL;
let subPrefix = "➔";

class CoreLogger {
  setLogType(type) {
    if (typeof type !== "number") return;

    logType = type;
  }

  logTime() {
    let nowDate = new Date();
    return (
      nowDate.toLocaleDateString() +
      " " +
      nowDate.toLocaleTimeString([], { hour12: false })
    );
  }

  log(...args) {
    if (logType < LOG_TYPES.NORMAL) return;

    console.log(
      this.logTime(),
      process.pid,
      chalk.bold.green("[INFO]"),
      ...args
    );
  }

  error(...args) {
    if (logType < LOG_TYPES.ERROR) return;

    console.log(
      this.logTime(),
      process.pid,
      chalk.bold.red("[ERROR]"),
      ...args
    );
  }

  debug(...args) {
    if (logType < LOG_TYPES.DEBUG) return;

    console.log(
      this.logTime(),
      process.pid,
      chalk.bold.blue("[DEBUG]"),
      ...args
    );
  }

  ffdebug(...args) {
    if (logType < LOG_TYPES.FFDEBUG) return;

    console.log(
      this.logTime(),
      process.pid,
      chalk.bold.blue("[FFDEBUG]"),
      ...args
    );
  }
}

const Logger = new CoreLogger();

export { Logger };
