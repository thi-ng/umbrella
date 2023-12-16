import type { Fn3, NumOrString } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import { readText, writeText } from "./text.js";

export const readJSON = <T = any>(path: string, logger?: ILogger): T =>
	JSON.parse(readText(path, logger));

/**
 * Serializes `obj` to JSON and writes result to UTF-8 file `path`. See
 * {@link writeText} for more details.
 *
 * @remarks
 * The `replacer` and `space` args are the same as supported by
 * `JSON.stringify()`.
 *
 * @param path
 * @param obj
 * @param replacer
 * @param space
 * @param logger
 * @param dryRun
 */
export const writeJSON = (
	path: string,
	obj: any,
	replacer?: Fn3<any, string, any, any> | NumOrString[] | null | undefined,
	space?: NumOrString | undefined,
	logger?: ILogger,
	dryRun = false
) =>
	writeText(
		path,
		JSON.stringify(obj, <any>replacer, space) + "\n",
		logger,
		dryRun
	);
