import _ from "underscore";
import color from "chalk";
import s from "underscore.string";

export class Logger {
    makeABox(message, title) {
        if (!_.isArray(message)) {
            message = message.split("\n");
        }
        let len = 0;

        len = Math.max.apply(
            null,
            message.map((line) => line.length)
        );

        const topLine = `+--${s.pad("", len, "-")}--+`;
        const separator = `|  ${s.pad("", len, "")}  |`;
        let lines = [];

        lines.push(topLine);
        if (title) {
            lines.push(`|  ${s.lrpad(title, len)}  |`);
            lines.push(topLine);
        }
        lines.push(separator);

        lines = [...lines, ...message.map((line) => `|  ${s.rpad(line, len)}  |`)];

        lines.push(separator);
        lines.push(topLine);

        return lines;
    }

    _logs(message, title) {
        const box = this.makeABox(message, title);
        let subPrefix = "➔";
        box.forEach((line) => {
            console.log(subPrefix, color.cyan(line));
        });
    }
}

export const SystemLogger = new Logger();
