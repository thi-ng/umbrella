import { flag, type Command } from "@thi.ng/args";
import type { Pow2 } from "@thi.ng/binary";
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
	desc: "List file tree of a BlockFS blob",
	fn: async (ctx) => {
		if (ctx.opts.all) {
			ctx.opts.withMtime = ctx.opts.withSize = true;
		}
		const buffer = readBinary(ctx.inputs[0]);
		const storage = new MemoryBlockStorage({
			numBlocks: (buffer.length / ctx.opts.blockSize) >>> 0,
			blockSize: <Pow2>ctx.opts.blockSize,
			logger: ctx.logger,
			buffer,
		});
		const bfs = new BlockFS(storage, { logger: ctx.logger });
		await bfs.init();
		const tree: [string, number, IEntry][] = [];
		for await (let entry of bfs.root.tree()) {
			const path = entry.path;
			const depth = path.split("/").length - 2;
			tree.push([path, depth, entry]);
		}
		tree.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
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
			const row: string[] = ctx.opts.tree
				? [
						[
							...last.slice(0, depth).map((x) => INDENT[x]),
							PREFIX[last[depth]],
							entry.name,
						].join(""),
				  ]
				: [path];
			if (ctx.opts.withSize) {
				row.push(entry.isDirectory() ? "" : String(Number(entry.size)));
			}
			if (ctx.opts.withMtime) {
				row.push(new Date(entry.mtime).toISOString());
			}
			rows.push(row);
			for (let i = 0; i < row.length; i++) {
				maxWidths[i] = Math.max(maxWidths[i], row[i].length);
			}
		}
		for (let row of rows) {
			console.log(row.map((x, i) => x.padEnd(maxWidths[i])).join("  "));
		}
	},
};
