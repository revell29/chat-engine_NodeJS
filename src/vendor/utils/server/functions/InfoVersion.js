// const info = require("../../info.json");
let msg = [
    `Chat Engine Version: 1.0.1-develop`,
    `     NodeJS Version: ${process.versions.node} - ${process.arch}`,
    `           Platform: ${process.platform}`,
    `       Process Port: ${process.env.SERVER_PORT}`,
    `       Author: Apsyadira`,
    `Github: https://github.com/revell29`,
];

msg = msg.join("\n");

export { msg };
