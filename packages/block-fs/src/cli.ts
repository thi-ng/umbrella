import {
	cliApp,
	flag,
	int,
	string,
	strings,
	type Command,
	type CommandCtx,
} from "@thi.ng/args";
import { align, isPow2, type Pow2 } from "@thi.ng/binary";
import { illegalArgs } from "@thi.ng/errors";
import { files, readBinary, readJSON, writeFile } from "@thi.ng/file-io";
import { LogLevel } from "@thi.ng/logger";
import { statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import type { IEntry } from "./api.js";
import { Entry } from "./entry.js";
import { BlockFS } from "./fs.js";
import { MemoryBlockStorage } from "./storage/memory.js";

const PKG = readJSON(join(process.argv[2], "package.json"));

interface CLIOpts {
	verbose: boolean;
}

interface ConvertOpts extends CLIOpts {
	numBlocks?: number;
	blockSize: number;
	include?: string[];
	out: string;
}

interface ListOpts extends CLIOpts {
	blockSize: number;
	all: boolean;
	tree: boolean;
	withMtime: boolean;
	withSize: boolean;
}

const ARG_BLOCKSIZE = {
	blockSize: int({
		alias: "bs",
		desc: "Block size",
		hint: "BYTES",
		default: 1024,
		coerce: (x: string) => {
			const size = +x;
			if (!isPow2(size)) illegalArgs("block size must be a power of 2");
			return size;
		},
	}),
};

export interface AppCtx<T extends CLIOpts> extends CommandCtx<T, CLIOpts> {}

interface CollectedFiles {
	files: {
		src: string;
		dest: string;
		size: number;
		ctime: number;
		mtime: number;
	}[];
	dirs: string[];
	size: number;
}

const collectFiles = (ctx: AppCtx<ConvertOpts>): CollectedFiles => {
	const root = resolve(ctx.inputs[0]);
	const filtered: CollectedFiles["files"] = [];
	const dirs = new Set<string>();
	let total = 0;
	for (let f of files(root)) {
		const stats = statSync(f);
		if (stats.isFile()) {
			const dest = relative(root, f);
			filtered.push({
				src: f,
				dest,
				size: stats.size,
				ctime: stats.ctimeMs,
				mtime: stats.mtimeMs,
			});
			dirs.add(dirname(dest));
			total += stats.size;
		}
	}
	return { files: filtered, dirs: [...dirs], size: total };
};

const computeBlockCount = (
	collected: CollectedFiles,
	blockSize: number,
	numBlocks?: number
): number => {
	let blocks = collected.dirs.length;
	const blockIDBytes = numBlocks
		? align(Math.ceil(Math.log2(numBlocks)), 8) >> 3
		: align(Math.ceil(Math.log2(collected.size / blockSize + blocks)), 8) >>
		  3;
	const blockDataSizeBytes = align(Math.ceil(Math.log2(blockSize)), 8) >> 3;
	const blockDataSize = blockSize - blockIDBytes - blockDataSizeBytes;
	blocks += Math.ceil(
		((collected.files.length + collected.dirs.length) * Entry.SIZE) /
			blockDataSize
	);
	for (let f of collected.files) {
		blocks += Math.ceil(f.size / blockDataSize);
	}
	const blockIDBytes2 = align(Math.ceil(Math.log2(blocks)), 8) >> 3;
	return blockIDBytes2 > blockIDBytes
		? computeBlockCount(collected, blockSize, blocks)
		: blocks;
};

export const CONVERT: Command<ConvertOpts, CLIOpts, AppCtx<ConvertOpts>> = {
	opts: {
		...ARG_BLOCKSIZE,
		numBlocks: int({
			alias: "n",
			desc: "Number of blocks (multiple of 8)",
			optional: true,
		}),
		out: string({
			alias: "o",
			desc: "Output file path",
			optional: false,
		}),
		include: strings({
			alias: "i",
			desc: "Only include file extensions",
			hint: "EXT",
		}),
	},
	desc: "Convert file tree into single BlockFS blob",
	fn: async (ctx) => {
		const collected = collectFiles(ctx);
		const numBlocks = align(
			ctx.opts.numBlocks ??
				computeBlockCount(collected, ctx.opts.blockSize),
			8
		);
		ctx.logger.info("number of files:", collected.files.length);
		ctx.logger.info("number of directories:", collected.dirs.length);
		ctx.logger.info("total file size:", collected.size);
		ctx.logger.info("number of blocks:", numBlocks);

		const storage = new MemoryBlockStorage({
			numBlocks,
			blockSize: <Pow2>ctx.opts.blockSize,
			logger: ctx.logger,
		});
		const bfs = new BlockFS(storage, { logger: ctx.logger });
		await bfs.init();
		for (let f of collected.files) {
			ctx.logger.debug("writing file:", f.dest);
			await bfs.writeFile(f.dest, readBinary(f.src));
			const entry = await bfs.entryForPath(f.dest);
			entry.ctime = f.ctime;
			entry.mtime = f.mtime;
			await entry.save();
		}
		writeFile(ctx.opts.out, storage.buffer, undefined, ctx.logger);
	},
};

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
		const tree: [string, IEntry][] = [];
		for await (let entry of bfs.root.tree()) {
			tree.push([entry.path, entry]);
		}
		tree.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
		const rows: string[][] = [];
		const maxWidths: number[] = [0, 0, 0];
		for (let f of tree) {
			const row: string[] = ctx.opts.tree
				? ["│ ".repeat(f[0].split("/").length - 2) + "├─" + f[1].name]
				: [f[1].path];

			if (ctx.opts.withSize) {
				row.push(f[1].isDirectory() ? "" : String(Number(f[1].size)));
			}
			if (ctx.opts.withMtime) {
				row.push(new Date(f[1].mtime).toISOString());
			}
			rows.push(row);
			for (let i = 0; i < row.length; i++) {
				maxWidths[i] = Math.max(maxWidths[i], row[i].length);
			}
		}
		for (let row of rows) {
			console.log(row.map((x, i) => x.padEnd(maxWidths[i])).join(" "));
		}
	},
};

cliApp<CLIOpts, AppCtx<any>>({
	opts: {
		verbose: flag({
			alias: "v",
			desc: "Display extra process information",
		}),
	},
	commands: {
		convert: CONVERT,
		list: LIST,
	},
	name: "blockfs",
	ctx: async (ctx) => {
		if (ctx.opts.verbose) ctx.logger.level = LogLevel.DEBUG;
		return ctx;
	},
	start: 3,
	usage: {
		prefix: `
 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ ${PKG.name} ${PKG.version}
 █ █ █ █ █ █ █ █ █ │ Block-based storage & file system layer
                 █ │
               █ █ │

Usage: blockfs <cmd> [opts] input [...]
       blockfs <cmd> --help\n`,
		showGroupNames: true,
		paramWidth: 32,
	},
});
