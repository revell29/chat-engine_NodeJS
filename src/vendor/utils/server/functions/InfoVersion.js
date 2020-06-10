const info = require("../../info.json");
let msg = [
    `Chat Engine Version: ${info.version}`,
    `     NodeJS Version: ${process.versions.node} - ${process.arch}`,
    `           Platform: ${process.platform}`,
    `       Process Port: ${process.env.SERVER_PORT}`,
    `       Author: ${info.author}`,
    `Github: ${info.github}`,
];

msg = msg.join("\n");

export { msg };
