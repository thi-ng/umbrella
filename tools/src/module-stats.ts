import { readJSON, writeJSON } from "@thi.ng/file-io";
import { execFileSync } from "node:child_process";
import { LOGGER } from "./api.js";

const pkg = readJSON("package.json", LOGGER);
const deps = [
	"tslib",
	"node:crypto",
	"node:fs",
	"node:child_process",
	"node:os",
	"node:path",
	"node:process",
	...Object.keys(pkg.dependencies || {}),
];
const opts = [
	"--bundle",
	"--target=es2020",
	"--format=esm",
	...deps.map((x) => `--external:${x}`),
	"index.js",
];
if (
	pkg.keywords.includes("nodejs") ||
	pkg.keywords.includes("bun") ||
	pkg.keywords.includes("no-browser")
) {
	opts.unshift("--platform=node");
}

const ESBUILD = "../../node_modules/esbuild/bin/esbuild";
const raw = execFileSync(ESBUILD, opts).toString();
const min = execFileSync(ESBUILD, ["--minify", ...opts]).toString();
const brotli = execFileSync("brotli", { input: min });

const stats = {
	raw: raw.length,
	min: min.length,
	brotli: brotli.byteLength,
};

// !existsSync(".meta") && mkdirSync(".meta");
// writeFileSync(".meta/raw.js", raw);
// writeFileSync(".meta/min.js", min);
writeJSON(".meta/size.json", { esm: stats }, null, 0, LOGGER);
console.log(stats);
