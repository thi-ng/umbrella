import type { Predicate } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import { readdirSync, statSync } from "node:fs";
import { sep } from "node:path";
import { isDirectory } from "./dir.js";
import { __ensurePred } from "./internal/ensure.js";

/**
 * Recursively reads given directory (up to given max. depth, default: infinite)
 * and yields sequence of file names matching given extension (or regexp or
 * predicate).
 *
 * @remarks
 * Files will be matched using their _full_ relative sub-path (starting with
 * given `dir`). If NO `match` is given, all files will be matched. Directories
 * will *not* be tested and are always traversed (up to given `maxDepth`).
 *
 * The optional `logger` is only used to log errors for files which couldn't be
 * accessed.
 *
 * @param dir
 * @param match
 * @param maxDepth
 * @param logger
 */
export const files = (
	dir: string,
	match: string | RegExp | Predicate<string> = "",
	maxDepth = Infinity,
	logger?: ILogger
) => __files(dir, match, logger, maxDepth, 0);

/** @internal */
function* __files(
	dir: string,
	match: string | RegExp | Predicate<string> = "",
	logger?: ILogger,
	maxDepth = Infinity,
	depth = 0
): IterableIterator<string> {
	if (depth >= maxDepth) return;
	const pred = __ensurePred(match);
	for (let f of readdirSync(dir).sort()) {
		const curr = dir + sep + f;
		try {
			if (isDirectory(curr)) {
				yield* __files(curr, match, logger, maxDepth, depth + 1);
			} else if (pred(curr)) {
				yield curr;
			}
		} catch (e) {
			logger &&
				logger.warn(`ignoring file: ${f} (${(<Error>e).message})`);
		}
	}
}

/**
 * Similar to {@link files}, however yields iterator of only matching
 * sub-directories in given `dir`. Normal files are being ignored.
 *
 * @remarks
 * Like the matcher in {@link files}, the regex or predicate will be applied to
 * the _full_ sub-path (starting with `dir`) in order to determine a match.
 *
 * @param dir
 * @param match
 * @param maxDepth
 * @param logger
 */
export const dirs = (
	dir: string,
	match: string | RegExp | Predicate<string> = "",
	maxDepth = Infinity,
	logger?: ILogger
) => __dirs(dir, match, logger, maxDepth, 0);

/** @internal */
function* __dirs(
	dir: string,
	match: string | RegExp | Predicate<string> = "",
	logger?: ILogger,
	maxDepth = Infinity,
	depth = 0
): IterableIterator<string> {
	if (depth >= maxDepth) return;
	const pred = __ensurePred(match);
	for (let f of readdirSync(dir).sort()) {
		const curr = dir + sep + f;
		try {
			if (statSync(curr).isDirectory()) {
				if (pred(curr)) yield curr;
				yield* __dirs(curr, match, logger, maxDepth, depth + 1);
			}
		} catch (e) {
			logger &&
				logger.warn(`ignoring file/dir: ${f} (${(<Error>e).message})`);
		}
	}
}
