import type { TypedArray } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { ILogger } from "@thi.ng/logger";
import { randomID } from "@thi.ng/random/random-id";
import { realpathSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { sep } from "node:path";
import { ensureDirForFile } from "./dir.js";

/**
 * Constructs a temp file path using {@link tempFilePath} and writes `body` to
 * this path, then returns path. If `name` is given and contains
 * sub-directories, they will be created automatically.
 *
 * @param body
 * @param logger
 * @param name
 * @param ext
 */
export const createTempFile = (
	body: string | TypedArray,
	logger?: ILogger,
	name?: string,
	ext?: string
) => {
	const path = tempFilePath(name, ext);
	logger && logger.debug("creating temp file:", path);
	ensureDirForFile(path);
	writeFileSync(path, body, isString(body) ? "utf-8" : undefined);
	return path;
};

/**
 * Constructs a file path in the system-defined temp directory, optionally using
 * provided basename and/or file extension.
 *
 * @remarks
 * If no `name` is given, constructs a random filename of `tmp-XXX` (16 random
 * chars).
 *
 * @param name
 * @param ext
 */
export const tempFilePath = (name?: string, ext = "") =>
	realpathSync(tmpdir()) + sep + (name || randomID(16, "tmp-")) + ext;
