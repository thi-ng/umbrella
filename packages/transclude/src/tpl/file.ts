// SPDX-License-Identifier: Apache-2.0
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { readText } from "@thi.ng/file-io/text";
import { basename, resolve } from "node:path";
import type { TemplateFn } from "../api.js";

/**
 * Parametric template function. Includes file given as template argument:
 * `{{include header.md}}`
 *
 * @remarks
 * Does NOT support recursive inclusion. Use {@link preincludeFile} (given as
 * {@link TranscludeCtx.pre} transform) as alternative.
 *
 * @param ctx
 * @param args
 * @param currPath
 */
export const includeFile: TemplateFn = ({ logger }, args, currPath) =>
	readText(resolve(resolve(currPath, ".."), args[2].trim()), logger);

/**
 * Pre-processing stage parametric template function. Recursively includes file
 * given as template argument: `<!-- include header.md -->`.
 *
 * @param ctx
 * @param args
 * @param initialPath
 */
export const preincludeFile: TemplateFn = ({ logger }, [src], initialPath) => {
	const pattern = /<!-- include (.+) -->/g;
	const fileCache: Record<string, string> = {};
	const replaceImport = (
		includePath: string,
		currPath: string,
		route: string[]
	): string => {
		includePath = resolve(resolve(currPath, ".."), includePath.trim());
		if (fileCache[includePath]) return fileCache[includePath];
		if (route.includes(includePath))
			illegalArgs(
				`include cycle detected: ${basename(currPath)} -> ${basename(
					includePath
				)}`
			);
		src = readText(includePath, logger).replace(pattern, (_, path) =>
			replaceImport(path, includePath, [...route, path])
		);
		return (fileCache[includePath] = src);
	};
	return src.replace(pattern, (_, path) =>
		replaceImport(path, initialPath, [initialPath])
	);
};
