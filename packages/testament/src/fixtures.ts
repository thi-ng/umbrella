import type { ILogger } from "@thi.ng/logger";
import { readFileSync } from "fs";
import { join, resolve } from "path";

/**
 * Only available for NodeJS. Returns path for given local fixture path, i.e.
 * prefixed with `test/fixtures/` and normalized for current platform. If `abs`
 * is true (default: false), returns absolute path.
 *
 * @remarks
 * The given local path should always use `/` as path separator (will be
 * possibly replaced with current platform's path sep).
 *
 * @param path
 * @param abs
 */
export const fixturePath = (path: string, abs = false) => {
	const $path = join("test", "fixtures", ...path.split("/"));
	return abs ? resolve($path) : $path;
};

/**
 * Takes local fixture path ID, transforms it with {@link fixturePath} and then
 * attempts to load that file. If `binary` is true, the file is loaded as binary
 * and returned as Uint8Array. In all other cases, the file is loaded as UTF-8
 * text and returned it as string.
 *
 * @remarks
 * If `logger` is given, a debug message with the fixture's file path is logged.
 *
 * @param path
 * @param logger
 * @param binary
 */
export function fileFixture(
	path: string,
	logger?: ILogger,
	binary?: false
): string;
export function fileFixture(
	path: string,
	logger: ILogger | undefined,
	binary: true
): Uint8Array;
export function fileFixture(path: string, logger?: ILogger, binary?: boolean) {
	const $path = fixturePath(path);
	logger && logger.debug("loading fixture:", $path);
	return binary
		? new Uint8Array(readFileSync($path))
		: readFileSync($path, "utf-8");
}
