import type { TypedArray } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { ILogger } from "@thi.ng/logger";
import { randomID } from "@thi.ng/random/random-id";
import { realpathSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { sep } from "node:path";
import { ensureDirForFile } from "./dir.js";

export const createTempFile = (
	body: string | TypedArray,
	logger?: ILogger,
	name?: string
) => {
	const path = tempFilePath(name);
	logger && logger.debug("creating temp file:", path);
	ensureDirForFile(path);
	writeFileSync(path, body, isString(body) ? "utf-8" : undefined);
	return path;
};

export const tempFilePath = (name?: string) =>
	realpathSync(tmpdir()) + sep + (name || randomID(16, "tmp-"));
