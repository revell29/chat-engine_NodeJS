import chalk from "chalk";
import { Logger } from "./Logger";

function ResponseLogger(req, res, next) {
  if (req) {
    Logger.log(`${chalk.bold.blue(req.method)} ${req.path}`);
  }
  next();
}

export { ResponseLogger };
