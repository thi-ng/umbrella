// SPDX-License-Identifier: Apache-2.0
import { readdirSync, rmSync, statSync, unlinkSync } from "node:fs";
import { basename, sep } from "node:path";

// utility functions adapted from thi.ng/file-io
// used here directly to be entirely self-contained...

const isDirectory = (path: string) => statSync(path).isDirectory();

const files = (dir: string, match: RegExp, maxDepth = Infinity) =>
	__files(dir, match, maxDepth, 0);

function* __files(
	dir: string,
	match: RegExp,
	maxDepth = Infinity,
	depth = 0
): IterableIterator<string> {
	if (depth >= maxDepth) return;
	const pred = (x: string) => match.test(x);
	for (let f of readdirSync(dir).sort()) {
		const curr = dir + sep + f;
		try {
			if (isDirectory(curr)) {
				yield* __files(curr, match, maxDepth, depth + 1);
			} else if (pred(curr)) {
				yield curr;
			}
		} catch (e) {
			console.warn(`ignoring file: ${f} (${(<Error>e).message})`);
		}
	}
}

function* dirs(
	dir: string,
	pred: (x: string) => boolean,
	maxDepth = Infinity,
	depth = 0
): IterableIterator<string> {
	if (depth >= maxDepth) return;
	for (let f of readdirSync(dir).sort()) {
		const curr = dir + sep + f;
		try {
			if (statSync(curr).isDirectory()) {
				if (pred(curr)) yield curr;
				yield* dirs(curr, pred, maxDepth, depth + 1);
			}
		} catch (e) {
			console.warn(`ignoring file/dir: ${f} (${(<Error>e).message})`);
		}
	}
}

// accept & merge additional dirs as CLI args
const removeDirs = new Set([
	"doc",
	"api",
	"generated",
	"internal",
	...process.argv.slice(2),
]);

for (let d of dirs(".", (x) => removeDirs.has(basename(x)), 1)) {
	console.log("removing directory:", d);
	rmSync(d, { recursive: true, force: true });
}

for (let f of files(".", /\.(map|js|d\.ts|tsbuildinfo|wasm|wast|o)$/)) {
	if (!(f.includes("/bin/") || f.includes("vite"))) {
		console.log("removing file:", f);
		unlinkSync(f);
	}
}
