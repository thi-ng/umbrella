// SPDX-License-Identifier: Apache-2.0
import {
	cliApp,
	flag,
	int,
	string,
	strings,
	THING_HEADER,
	type Command,
	type CommandCtx,
} from "@thi.ng/args";
import { align, isPow2, type Pow2 } from "@thi.ng/binary";
import { illegalArgs } from "@thi.ng/errors";
import { files, readBinary, readJSON, writeFile } from "@thi.ng/file-io";
import { LogLevel, type ILogger } from "@thi.ng/logger";
import { statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import type { IEntry } from "./api.js";
import { Entry } from "./entry.js";
import { BlockFS } from "./fs.js";
import { MemoryBlockStorage } from "./storage/memory.js";

const PKG = readJSON(join(process.argv[2], "package.json"));

interface CLIOpts {
	verbose: boolean;
	quiet: boolean;
}

interface ConvertOpts extends CLIOpts {
	numBlocks?: number;
	blockSize: number;
	exclude?: string[];
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

/**
 * Returns number of bytes needed to encode given value.
 *
 * @param x
 */
const requiredBytes = (x: number) => align(Math.ceil(Math.log2(x)), 8) >> 3;

const pathsForFile = (f: string) => {
	const parts = f.split("/");
	const dirs: string[] = [];
	for (let i = 1; i < parts.length; i++)
		dirs.push(parts.slice(0, i).join("/"));
	return dirs;
};

const collectFiles = ({
	opts: { include, exclude },
	inputs,
}: AppCtx<ConvertOpts>): CollectedFiles => {
	const root = resolve(inputs[0]);
	const filtered: CollectedFiles["files"] = [];
	const dirs = new Set<string>();
	const $include = include?.map((x) => new RegExp(x));
	const $exclude = exclude?.map((x) => new RegExp(x));
	let total = 0;
	for (let f of files(root)) {
		const stats = statSync(f);
		if ($exclude && $exclude.some((x) => x.test(f))) continue;
		if ($include && !$include.some((x) => x.test(f))) continue;
		const dest = relative(root, f);
		filtered.push({
			src: f,
			dest,
			size: stats.size,
			ctime: stats.ctimeMs,
			mtime: stats.mtimeMs,
		});
		for (let d of pathsForFile(dest)) dirs.add(d);
		total += stats.size;
	}
	return { files: filtered, dirs: [...dirs], size: total };
};

const computeBlockCount = (
	collected: CollectedFiles,
	blockSize: number,
	logger: ILogger,
	numBlocks?: number
): number => {
	let blocks = collected.dirs.length;
	const blockIDBytes = requiredBytes(
		numBlocks ?? collected.size / blockSize + blocks
	);
	const blockDataSizeBytes = requiredBytes(blockSize);
	const blockDataSize = blockSize - blockIDBytes - blockDataSizeBytes;
	const numEntries = collected.files.length + collected.dirs.length;
	const numEntryBlocks = Math.ceil((numEntries * Entry.SIZE) / blockDataSize);
	logger.info("num entries:", numEntries);
	logger.info("num entry blocks:", numEntryBlocks);
	blocks += numEntryBlocks;
	for (let f of collected.files) {
		const size = Math.ceil(f.size / blockDataSize);
		logger.debug("file:", f.src, "blocks:", size);
		blocks += size;
	}
	const blockIDBytes2 = requiredBytes(blocks);
	return blockIDBytes2 > blockIDBytes
		? computeBlockCount(collected, blockSize, logger, blocks)
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
		exclude: strings({
			alias: "e",
			desc: "File exclusion regexp",
			hint: "EXT",
		}),
		include: strings({
			alias: "i",
			desc: "File inclusion regexp",
			hint: "EXT",
		}),
	},
	desc: "Convert file tree into single BlockFS blob",
	fn: async (ctx) => {
		const collected = collectFiles(ctx);
		const numBlocks = align(
			ctx.opts.numBlocks ??
				computeBlockCount(collected, ctx.opts.blockSize, ctx.logger),
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

		ctx.logger.info("root dir block:", bfs.rootDirBlockID);
		ctx.logger.info("first data block:", bfs.dataStartBlockID);
		ctx.logger.info("block data size:", bfs.blockDataSize);

		for (let f of collected.files) {
			const data = readBinary(f.src, ctx.logger);
			ctx.logger.info("writing file:", f.dest, "size:", data.length);
			await bfs.writeFile(f.dest, data);
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
		const tree: [string, number, IEntry][] = [];
		for await (let entry of bfs.root.tree()) {
			const path = entry.path;
			const depth = path.split("/").length - 2;
			tree.push([path, depth, entry]);
		}
		tree.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
		const rows: string[][] = [];
		const maxWidths: number[] = [0, 0, 0];
		for (let i = 0, num = tree.length - 1; i <= num; i++) {
			const f = tree[i];
			const isLast = i === num || f[1] > tree[i + 1][1];
			const row: string[] = ctx.opts.tree
				? ["│   ".repeat(f[1]) + (isLast ? "└── " : "├── ") + f[2].name]
				: [f[0]];
			if (ctx.opts.withSize) {
				row.push(f[2].isDirectory() ? "" : String(Number(f[2].size)));
			}
			if (ctx.opts.withMtime) {
				row.push(new Date(f[2].mtime).toISOString());
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

cliApp<CLIOpts, AppCtx<any>>({
	name: "blockfs",
	start: 3,
	opts: {
		verbose: flag({
			alias: "v",
			desc: "Display extra logging information",
		}),
		quiet: flag({
			alias: "q",
			desc: "Disable logging",
		}),
	},
	commands: {
		convert: CONVERT,
		list: LIST,
	},
	ctx: async (ctx) => {
		if (ctx.opts.quiet) ctx.logger.level = LogLevel.NONE;
		else if (ctx.opts.verbose) ctx.logger.level = LogLevel.DEBUG;
		return ctx;
	},
	usage: {
		prefix: `${THING_HEADER(
			PKG.name,
			PKG.version,
			"Block-based storage & file system layer"
		)}

Usage: blockfs <cmd> [opts] input [...]
       blockfs <cmd> --help\n`,
		showGroupNames: true,
		paramWidth: 32,
	},
});
