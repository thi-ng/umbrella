// SPDX-License-Identifier: Apache-2.0
import { int, string, strings, type Command } from "@thi.ng/args";
import { align, type Pow2 } from "@thi.ng/binary";
import { files, readBinary, writeFile } from "@thi.ng/file-io";
import type { ILogger } from "@thi.ng/logger";
import { statSync } from "node:fs";
import { relative, resolve } from "node:path";
import { Entry } from "../entry.js";
import { BlockFS } from "../fs.js";
import { MemoryBlockStorage } from "../storage/memory.js";
import { ARG_BLOCKSIZE, type AppCtx, type CLIOpts } from "./api.js";

const { ceil, log2 } = Math;

export interface ConvertOpts extends CLIOpts {
	numBlocks?: number;
	blockSize: number;
	exclude?: string[];
	include?: string[];
	out: string;
}

export const CONVERT: Command<ConvertOpts, CLIOpts, AppCtx<ConvertOpts>> = {
	opts: {
		...ARG_BLOCKSIZE,
		numBlocks: int({
			alias: "n",
			desc: "Number of blocks (multiple of 8)",
		}),
		out: string({
			alias: "o",
			desc: "Output file path",
			required: true,
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
	inputs: 1,
	desc: "Convert file tree into single BlockFS blob",
	fn: async (ctx) => {
		const { opts, logger } = ctx;
		const collected = collectFiles(ctx);
		const numBlocks = align(
			opts.numBlocks ??
				computeBlockCount(collected, opts.blockSize, ctx.logger),
			8
		);
		logger.info("number of files:", collected.files.length);
		logger.info("number of directories:", collected.dirs.length);
		logger.info("total file size:", collected.size);
		logger.info("number of blocks:", numBlocks);

		const storage = new MemoryBlockStorage({
			blockSize: <Pow2>opts.blockSize,
			numBlocks,
			logger,
		});
		const bfs = new BlockFS(storage, { logger });
		await bfs.init();

		logger.info("root dir block:", bfs.rootDirBlockID);
		logger.info("first data block:", bfs.dataStartBlockID);
		logger.info("block data size:", bfs.blockDataSize);

		for (const f of collected.files) {
			const data = readBinary(f.src, logger);
			logger.info("writing file:", f.dest, "size:", data.length);
			await bfs.writeFile(f.dest, data);
			const entry = await bfs.entryForPath(f.dest);
			entry.ctime = f.ctime;
			entry.mtime = f.mtime;
			await entry.save();
		}
		writeFile(opts.out, storage.buffer, undefined, logger);
	},
};

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
	for (const f of files(root)) {
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
		for (const d of pathsForFile(dest)) dirs.add(d);
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
	const maxEntriesPerBlock = ~~(blockDataSize / Entry.SIZE);
	const numEntryBlocks = ceil(numEntries / maxEntriesPerBlock);
	logger.info("num entries:", numEntries);
	logger.info("num entry blocks:", numEntryBlocks);
	blocks += numEntryBlocks;
	for (const f of collected.files) {
		const size = ceil(f.size / blockDataSize);
		logger.debug("file:", f.src, "blocks:", size);
		blocks += size;
	}
	const blockIDBytes2 = requiredBytes(blocks);
	return blockIDBytes2 > blockIDBytes
		? computeBlockCount(collected, blockSize, logger, blocks)
		: blocks;
};

/**
 * Returns number of bytes needed to encode given value.
 *
 * @param x
 */
const requiredBytes = (x: number) => align(ceil(log2(x)), 8) >> 3;
