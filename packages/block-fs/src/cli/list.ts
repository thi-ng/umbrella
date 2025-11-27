// SPDX-License-Identifier: Apache-2.0
import { flag, type Command } from "@thi.ng/args";
import type { Pow2 } from "@thi.ng/binary";
import { compareByKey } from "@thi.ng/compare";
import { readBinary } from "@thi.ng/file-io";
import type { IEntry } from "../api.js";
import { BlockFS } from "../fs.js";
import { MemoryBlockStorage } from "../storage/memory.js";
import { ARG_BLOCKSIZE, type AppCtx, type CLIOpts } from "./api.js";

interface ListOpts extends CLIOpts {
	blockSize: number;
	all: boolean;
	tree: boolean;
	withMtime: boolean;
	withSize: boolean;
}

const INDENT = ["│   ", "    "];
const PREFIX = ["├── ", "└── "];

export const LIST: Command<ListOpts, CLIOpts, AppCtx<ListOpts>> = {
	opts: {
		...ARG_BLOCKSIZE,
		all: flag({
			alias: "a",
			desc: "Display all attribs",
		}),
		tree: flag({
			alias: "t",
			desc: "List files as tree",
		}),
		withMtime: flag({
			alias: "m",
			desc: "Display modified times",
		}),
		withSize: flag({
			alias: "s",
			desc: "Display file sizes",
		}),
	},
	inputs: 1,
	desc: "List file tree of a BlockFS blob",
	fn: async ({ inputs, opts, logger }) => {
		if (opts.all) {
			opts.withMtime = opts.withSize = true;
		}
		const buffer = readBinary(inputs[0], logger);
		const storage = new MemoryBlockStorage({
			numBlocks: (buffer.length / opts.blockSize) >>> 0,
			blockSize: <Pow2>opts.blockSize,
			logger,
			buffer,
		});
		const bfs = new BlockFS(storage, { logger });
		await bfs.init();
		const tree: [string, number, IEntry][] = [];
		for await (let entry of bfs.root.tree(compareByKey("name"))) {
			const path = entry.path;
			const depth = path.split("/").length - 2;
			tree.push([path, depth, entry]);
		}
		const rows: string[][] = [];
		const maxWidths: number[] = [0, 0, 0];
		const last: number[] = [];
		for (let i = 0, num = tree.length - 1; i <= num; i++) {
			const [path, depth, entry] = tree[i];
			last[depth] = ~~(i === num);
			for (let j = i + 1; j <= num; j++) {
				if (tree[j][1] === depth) break;
				if (tree[j][1] < depth || j === num) {
					last[depth] = 1;
					break;
				}
			}
			const row: string[] = opts.tree
				? [
						[
							...last.slice(0, depth).map((x) => INDENT[x]),
							PREFIX[last[depth]],
							entry.name,
						].join(""),
				  ]
				: [path];
			if (opts.withSize) {
				row.push(entry.isDirectory() ? "" : String(Number(entry.size)));
			}
			if (opts.withMtime) {
				row.push(new Date(entry.mtime).toISOString());
			}
			rows.push(row);
			for (let i = 0; i < row.length; i++) {
				maxWidths[i] = Math.max(maxWidths[i], row[i].length);
			}
		}
		for (const row of rows) {
			console.log(row.map((x, i) => x.padEnd(maxWidths[i])).join("  "));
		}
	},
};
