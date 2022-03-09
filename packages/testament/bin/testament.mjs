#!/usr/bin/env node

import { spawn } from "child_process";
import { join } from "path";
const [node, toolsDir, ...args] = process.argv;

const cli = join(toolsDir, "..", "..", "cli.js");
const child = spawn(node, ["--loader", "ts-node/esm", cli, ...args]);

child.stderr.on("data", (d) => {
    const dStr = d.toString().trim();
    !dStr.includes("ExperimentalWarning") ? console.log(dStr) : "";
});
child.on("exit", (err) => process.exit(err));
child.stdout.pipe(process.stdout);
