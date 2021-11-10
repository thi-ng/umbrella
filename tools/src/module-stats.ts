import { execFileSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { readJSON } from "./io.js";

const pkg = readJSON("package.json");
const deps = [
    "tslib",
    "fs",
    "child_process",
    "path",
    ...Object.keys(pkg.dependencies || {}),
];
const opts = [
    "--bundle",
    "--target=es2020",
    "--format=esm",
    ...deps.map((x) => `--external:${x}`),
    "index.js",
];
const raw = execFileSync(
    "../../node_modules/esbuild/bin/esbuild",
    opts
).toString();
const min = execFileSync("../../node_modules/esbuild/bin/esbuild", [
    "--minify",
    ...opts,
]).toString();
const gzip = execFileSync("gzip", { input: min });

const stats = {
    raw: raw.length,
    min: min.length,
    gzip: gzip.byteLength,
};

!existsSync(".meta") && mkdirSync(".meta");
// writeFileSync(".meta/raw.js", raw);
// writeFileSync(".meta/min.js", min);
writeFileSync(".meta/size.json", JSON.stringify({ esm: stats }));
console.log(stats);
