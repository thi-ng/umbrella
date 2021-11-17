#!/usr/bin/env node

const src = "module-stats.ts";
import { spawn } from "child_process";
import { join } from "path";
const [node, toolsDir, ...args] = process.argv;

const cli = join(toolsDir, "..", "..", "src", src);
const p = spawn(node, ["--loader", "ts-node/esm", cli, ...args]);

p.stdout.on('data', d => console.log(d.toString().trim()));
p.stderr.on('data', d => {
  const dStr = d.toString().trim();
  !dStr.includes("ExperimentalWarning") ? console.log(dStr) : "";
});
