// SPDX-License-Identifier: Apache-2.0
import type { Fn3, Maybe, Nullable, NumOrString } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import { readText, readTextAsync, writeText, writeTextAsync } from "./text.js";

/**
 * Reads given file as UTF-8 and parses result as JSON of type `T`.
 *
 * @param path
 * @param logger
 */
export const readJSON = <T = any>(path: string, logger?: ILogger): T =>
	JSON.parse(readText(path, logger));

/**
 * Async version of {@link readJSON}.
 *
 * @param path
 * @param logger
 */
export const readJSONAsync = async <T = any>(
	path: string,
	logger?: ILogger
): Promise<T> => JSON.parse(await readTextAsync(path, logger));

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
	replacer?: Fn3<any, string, any, any> | Nullable<NumOrString[]>,
	space?: Maybe<NumOrString>,
	logger?: ILogger,
	dryRun = false
) =>
	writeText(
		path,
		JSON.stringify(obj, <any>replacer, space) + "\n",
		logger,
		dryRun
	);

/**
 * Async version of {@link writeJSON}.
 *
 * @param path
 * @param obj
 * @param replacer
 * @param space
 * @param logger
 * @param dryRun
 */
export const writeJSONAsync = (
	path: string,
	obj: any,
	replacer?: Fn3<any, string, any, any> | Nullable<NumOrString[]>,
	space?: Maybe<NumOrString>,
	logger?: ILogger,
	dryRun = false
) =>
	writeTextAsync(
		path,
		JSON.stringify(obj, <any>replacer, space) + "\n",
		logger,
		dryRun
	);
